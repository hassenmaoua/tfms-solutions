import styles from './Footer.module.css';

function Footer() {
  return (
    <footer
      className={styles.container}
      style={{
        color: '#F3F4F6',
        textAlign: 'center',
      }}
    >
      <section style={{}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            textAlign: 'center',
            marginTop: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              paddingRight: '1rem',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h6 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
              TFMS Solutions
            </h6>
          </div>

          <div
            style={{
              paddingRight: '1rem',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h6 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
              Adresse
            </h6>
            <p>Rue de l'indépendance M'Saken 4070</p>
          </div>

          <div
            style={{
              paddingRight: '1rem',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h6 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
              Email
            </h6>
            <p>tfms-solution@contact.tn</p>
          </div>

          <div
            style={{
              paddingRight: '1rem',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h6 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
              Contact
            </h6>
            <p>+216 55 298 403</p>
          </div>
        </div>
      </section>

      <div
        style={{
          padding: '1rem',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        © 2022 Copyright :{' '}
        <a
          style={{ fontWeight: '700' }}
          href='https://github.com/hassenmaoua/tfms-solutions'
        >
          github.com/hassenmaoua/tfms-solutions
        </a>
      </div>
    </footer>
  );
}

export default Footer;
