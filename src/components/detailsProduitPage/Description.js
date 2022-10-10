import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Description(props) {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  const [description, setDescription] = useState('');

  async function submitHandler() {
    try {
      const response = await axiosPrivate.patch(`/produit/${params.id}`, {
        description,
      });

      console.log(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <textarea
      rows={3}
      defaultValue={props.defaultValue}
      onChange={(e) => {
        console.log(e.target.value);
        setDescription(e.target.value);
      }}
      onBlur={() => {
        submitHandler();
      }}
    ></textarea>
  );
}

export default Description;
