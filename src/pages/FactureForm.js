import React from 'react';
import Layout from '../components/layout/Layout';
import InvoiceForm from '../components/ajouterFacture/InvoiceForm';
import Spinner from '../components/layout/Spinner';

function FactureForm() {
  const respone = true;

  return (
    <Layout>
      {respone ? <InvoiceForm respone={respone}> </InvoiceForm> : <Spinner />}
    </Layout>
  );
}

export default FactureForm;
