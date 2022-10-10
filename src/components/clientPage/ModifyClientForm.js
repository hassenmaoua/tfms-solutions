import styles from './NewClientForm.module.css';
import Modal from '../ui/Modal';
import PictureUploader from '../ui/PictureUploader ';
import CurrencyFormat from 'react-currency-format';
import InputFormatter from '../ui/InputFormatter';
import { useState } from 'react';

function ModifyClientForm(props) {
  const closeHandler = props.onClose;
  const data = props.client;

  const [clientType, setClientType] = useState({
    label: 'Nom Complet',
    placeHolder: 'Entrer Nom et Prénom',
  });

  const [isIndividual, setIsIndividual] = useState(
    data.isIndividual ? 'true' : 'false'
  );
  function radioHandler(e) {
    setIsIndividual(e.target.value);
    isIndividual
      ? setClientType({
          label: 'Nom Complet',
          placeHolder: 'Entrer Nom et Prénom',
        })
      : setClientType({
          label: 'Nom Societé',
          placeHolder: 'Entrer un nom du Societé',
        });
  }

  const [intitule, setIntitule] = useState(data.intitule);
  function onIntituleChange(e) {
    setIntitule(
      e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );

    setCount(e.target.value.length + '/' + maxLength);
  }

  const [email, setEmail] = useState(data.email);
  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  const [identifiantFiscal, setIdentifiantFiscal] = useState(
    data.identifiantFiscal
  );
  function onIdentifiantChange(e) {
    setIdentifiantFiscal(e.target.value);
  }

  const [adresse, setAdresse] = useState(data.adresse);
  function onAdresseChange(e) {
    setAdresse(e.target.value);
  }

  const [photo, setPhoto] = useState('');

  const [oldPhoto, setOldPhoto] = useState(data.photo);

  const [phone, setPhone] = useState(data.phone);

  const maxLength = 25;
  const [count, setCount] = useState('0/' + maxLength);

  const onSubmit = props.onSubmit;

  async function submitHandler(event) {
    const formData = new FormData();

    formData.append('identifiantFiscal', identifiantFiscal);
    formData.append('intitule', intitule);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('adresse', adresse);
    formData.append('isIndividual', isIndividual);
    formData.append('photo', photo);

    onSubmit(event, formData, data._id);
  }

  return (
    <Modal
      height='350px'
      onSubmit={submitHandler}
      title='Modifier Client'
      onClose={closeHandler}
    >
      <div className={styles.container}>
        <div className={styles.right}>
          <InputFormatter width='100%' hint={count} label={clientType.label}>
            <input
              required
              type='text'
              placeholder={clientType.placeHolder}
              maxLength={maxLength}
              onChange={onIntituleChange}
              value={intitule}
              autoFocus
            />
          </InputFormatter>

          <InputFormatter width='100%' hint='*Obligatoire' label='Email'>
            <input
              required
              type='email'
              placeholder='exemple@email.com'
              value={email}
              onChange={onEmailChange}
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
              value={identifiantFiscal}
              onChange={onIdentifiantChange}
            />
          </InputFormatter>

          <InputFormatter width='100%' label='Adresse'>
            <input
              type='text'
              maxLength={50}
              value={adresse}
              onChange={onAdresseChange}
            />
          </InputFormatter>
        </div>

        <div className={styles.left}>
          <PictureUploader setFile={setPhoto} photo={oldPhoto} />

          <div className={styles.typeContainer}>
            <input
              type='radio'
              name='type'
              value='true'
              checked={isIndividual === 'true'}
              onChange={radioHandler}
            />
            <label>Individuelle </label>
            <input
              type='radio'
              name='type'
              value='false'
              checked={isIndividual === 'false'}
              onChange={radioHandler}
            />
            <label> Societé</label>
          </div>

          <InputFormatter width='100%' label='Numero Telephone'>
            <CurrencyFormat
              placeholder=' +216 00 000 000'
              type='tel'
              format=' +216 ## ### ###'
              value={phone}
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

export default ModifyClientForm;
