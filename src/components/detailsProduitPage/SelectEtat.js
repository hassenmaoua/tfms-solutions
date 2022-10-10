import { useState, useEffect } from 'react';
import { GoGear } from 'react-icons/go';
import Select, { components } from 'react-select';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <GoGear />
    </components.DropdownIndicator>
  );
};

const colourStyles = {
  dropdownIndicator: (styles, data) => {
    return {
      ...styles,
      color: data.getValue()[0].style,
      ':hover': {
        color: data.getValue()[0].style,
        cursor: 'pointer',
      },
    };
  },
  control: (styles, data) => {
    return {
      ...styles,
      backgroundColor: data.getValue()[0].style + '25',
    };
  },
  option: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.style + '25',
    color: data.style,
  }),
  singleValue: (provided, { data }) => ({
    ...provided,
    fontWeight: '700',
    color: data.style,
  }),
};

function SelectEtat(props) {
  const axiosPrivate = useAxiosPrivate();
  var options;
  const [data, setData] = useState('');

  useEffect(() => {
    async function fetchEtat() {
      try {
        const response = await axiosPrivate.get('/etat/list/ETP');
        console.log(response?.data?.message);
        setData(response?.data?.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchEtat();
  }, [axiosPrivate]);

  async function updateEtat(etat) {
    etat['_id'] = etat['value'];
    delete etat['value'];
    try {
      const response = await axiosPrivate.patch(`/produit/${props.id}`, {
        etat,
      });
      console.log(response?.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  data
    ? (options = data.map(({ _id: value, ...rest }) => ({
        value,
        ...rest,
      })))
    : (options = {});

  return (
    <div>
      <Select
        components={{ DropdownIndicator }}
        defaultValue={props.etat}
        isSearchable={false}
        options={options}
        placeholder={'Select Etat'}
        styles={colourStyles}
        onChange={(etat) => updateEtat(etat)}
        theme={(theme) => ({
          ...theme,
          borderRadius: '5px',
          colors: {
            ...theme.colors,
            primary50: '#def39f',
            primary25: '#c2e068',
            primary: '#7ea310',
          },
        })}
      />
    </div>
  );
}

export default SelectEtat;
