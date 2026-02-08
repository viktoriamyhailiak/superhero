import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchSuperheroById, deleteSuperhero } from "../api/superhero";
import styles from "../styles/SuperheroDetail.scss";

const SuperheroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHero = async () => {
      try {
        setLoading(true);
        const data = await fetchSuperheroById(+id);
        setHero(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadHero();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this superhero?")) return;

    try {
      await deleteSuperhero(hero.id);
      alert("Superhero deleted successfully!");
      navigate("/"); // редирект до списку після видалення
    } catch (error) {
      console.error("Failed to delete superhero", error);
      alert("Failed to delete superhero");
    }
  };

  if (loading) return <div className={styles["superhero-detail__placeholder"]}>Loading...</div>;
  if (!hero) return <div className={styles["superhero-detail__placeholder"]}>Hero not found</div>;

  return (
    <div className={styles["superhero-detail"]}>
      <h1 className={styles["superhero-detail__name"]}>{hero.nickname}</h1>

      <div className={styles["superhero-detail__images-gallery"]}>
        {hero.images?.map((img) => (
          <img
            key={img.id}
            src={`http://localhost:3001${img.url}`}
            alt={hero.nickname}
            className={styles["superhero-detail__image"]}
          />
        ))}
      </div>

      <div className={styles["superhero-detail__info"]}>
        <div className={styles["superhero-detail__info-item"]}>
          <span className={styles["superhero-detail__label"]}>Real Name:</span>
          <span className={styles["superhero-detail__value"]}>{hero.realName}</span>
        </div>
        <div className={styles["superhero-detail__info-item"]}>
          <span className={styles["superhero-detail__label"]}>Origin:</span>
          <span className={styles["superhero-detail__value"]}>{hero.originDescription}</span>
        </div>
        <div className={styles["superhero-detail__info-item"]}>
          <span className={styles["superhero-detail__label"]}>Superpowers:</span>
          <span className={styles["superhero-detail__value"]}>{hero.superpowers}</span>
        </div>
        <div className={styles["superhero-detail__info-item"]}>
          <span className={styles["superhero-detail__label"]}>Catch Phrase:</span>
          <span className={styles["superhero-detail__value"]}>{hero.catchPhrase}</span>
        </div>
      </div>

      <div className={styles["superhero-detail__buttons"]}>
        <Link to={`/edit/${hero.id}`}>
          <button className={styles["superhero-detail__edit-button"]}>Edit Hero</button>
        </Link>

        <button
          className={styles["superhero-detail__delete-button"]}
          onClick={handleDelete}
        >
          Delete Hero
        </button>

        <Link to="/">
          <button className={styles["superhero-detail__back-button"]}>Back to List</button>
        </Link>
      </div>
    </div>
  );
};

export default SuperheroDetail;
