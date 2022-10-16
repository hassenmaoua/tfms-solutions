import styles from './Body.module.css';

function Body() {
  return (
    <div className={styles.container}>
      <div className={styles.factureContainer}>
        <h2>Gestionnaire des facture</h2>
        <p>
          Une suite complète pour tous vos besoins en matière de facturation, de
          l'envoi de devis aux factures, en passant par l'enregistrement d'un
          paiement.
        </p>
      </div>
      <div className={styles.produitContainer}>
        <h2>Création, Gestion et Contrôle des Produits</h2>
        <p>
          Production d'ingénierie structurelle, vous pouvez estimer l'avance de
          production, les extensions aux projets multi-unités
        </p>
      </div>
      <div className={styles.clientContainer}>
        <h2>Communication Efficace avec les Clientèles</h2>
        <p>
          Contactez nos clients, ou envoyez une copie de votre avance sur
          production.
        </p>
      </div>

      <div className={styles.descriptionContainer}>
        <h2>Bienvenue sur le site web de TFMS Solutions</h2>
        <p>
          TFMS Solutions est une entreprise en pleine croissance, qui s'efforce
          d'établir des relations avec les clients et les travailleurs pour
          assurer une communication ouverte tout au long d'un concessionnaire
          afin de produire un travail de qualité et rentable. Notre expérience
          s'étend à travers la Tunisie, complétant de nombreuses pièces de
          tournage, d'alésage, de perçage et d'alésage avec une implication
          depuis la phase initiale de conception jusqu'à la certification de la
          production sur site. nous croyons que la livraison à temps et les
          délais d'exécution garantis sont une partie impérative de notre
          activité, et nous nous efforçons de faire en sorte que les attentes de
          nos travailleurs soient extrêmement bien satisfaites.
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </div>
  );
}

export default Body;
