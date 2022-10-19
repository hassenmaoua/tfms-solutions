import styles from './Form.module.css';
import CurrencyFormat from 'react-currency-format';
import { useRef, useState } from 'react';
import Modal from '../../ui/Modal';
import PictureUploader from '../../ui/PictureUploader ';
import InputFormatter from '../../ui/InputFormatter';

function NewClientForm(props) {
  const closeHandler = props.onClose;

  const maxLength = 25;
  const [count, setCount] = useState('0/' + maxLength);

  const [type, setType] = useState('true');

  const [client, setClient] = useState({
    label: 'Nom Complet',
    placeHolder: 'Entrer Nom et Prénom',
  });

  function radioHandler(e) {
    setType(e.target.value);
    type === 'false'
      ? setClient({
          label: 'Nom Complet',
          placeHolder: 'Entrer Nom et Prénom',
        })
      : setClient({
          label: 'Nom Societé',
          placeHolder: 'Entrer un nom du Societé',
        });
  }

  const identifiantInputRef = useRef();
  const emailInputRef = useRef();
  const adresseInputRef = useRef();

  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [intitule, setIntitule] = useState('');

  function intituleHandler(e) {
    setIntitule(
      e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );

    setCount(e.target.value.length + '/' + maxLength);
  }

  const onSubmit = props.onSubmit;

  async function submitHandler(event) {
    const formData = new FormData();

    formData.append('identifiantFiscal', identifiantInputRef.current.value);
    formData.append('intitule', intitule);
    formData.append('email', emailInputRef.current.value);
    formData.append('phone', phone);
    formData.append('adresse', adresseInputRef.current.value);
    formData.append('isIndividual', type);
    formData.append('photo', photo);

    onSubmit(event, formData);
  }

  return (
    <Modal
      height='360px'
      onSubmit={submitHandler}
      title='Ajouter nouveau Client'
      onClose={closeHandler}
    >
      <div className={styles.container}>
        <div className={styles.right}>
          <InputFormatter width='100%' hint={count} label={client.label}>
            <input
              required
              type='text'
              placeholder={client.placeHolder}
              maxLength={maxLength}
              onChange={intituleHandler}
              value={intitule}
              autoFocus
            />
          </InputFormatter>

          <InputFormatter width='100%' hint='*Obligatoire' label='Email'>
            <input
              required
              type='email'
              placeholder='exemple@email.com'
              ref={emailInputRef}
            />
          </InputFormatter>

          <InputFormatter
            width='100%'
            hint='*Obligatoire'
            label='Identifiant Fiscal'
          >
            <input
              required
              type='text'
              maxLength={25}
              ref={identifiantInputRef}
            />
          </InputFormatter>

          <InputFormatter width='100%' label='Adresse'>
            <input type='text' maxLength={50} ref={adresseInputRef} />
          </InputFormatter>
        </div>

        <div className={styles.left}>
          <PictureUploader setFile={setPhoto} />

          <div className={styles.typeContainer}>
            <input
              type='radio'
              value={true}
              name='type'
              checked={type === 'true'}
              onChange={radioHandler}
            />
            <label htmlFor='typet'>Individuelle </label>
            <input
              type='radio'
              value={false}
              name='type'
              checked={type === 'false'}
              onChange={radioHandler}
            />
            <label htmlFor='typef'> Societé</label>
          </div>

          <InputFormatter width='100%' label='Numero Telephone'>
            <CurrencyFormat
              placeholder=' +216 00 000 000'
              type='tel'
              format=' +216 ## ### ###'
              onValueChange={(values) => {
                setPhone(values.formattedValue);
              }}
              required
            />
          </InputFormatter>
        </div>
      </div>
    </Modal>
  );
}

export default NewClientForm;
