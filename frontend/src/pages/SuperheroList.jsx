import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSuperhero, fetchSuperheroes } from "../api/superhero";
import styles from "../styles/SuperheroList.module.scss";

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    const loadHeroes = async () => {
      setLoading(true);
      try {
        const data = await fetchSuperheroes(page, limit);
        setSuperheroes(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch superheroes", error);
      } finally {
        setLoading(false);
      }
    };
    loadHeroes();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this superhero?")) return;
  
    try {
      await deleteSuperhero(id);
      setSuperheroes((prev) => prev.filter((hero) => hero.id !== id));
      alert("Superhero deleted successfully!");
    } catch (error) {
      console.error("Failed to delete superhero", error);
      alert("Failed to delete superhero");
    }
  };
  

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={styles["superhero-list"]}>
      <h1 className={styles["superhero-list__title"]}>Superheroes</h1>

      <Link to="/create">
        <button className={styles["superhero-list__create-button"]}>
          Create New Superhero
        </button>
      </Link>

      {loading ? (
        <div className={styles["superhero-list__placeholder"]}>Loading...</div>
      ) : (
        <div className={styles["superhero-list__grid"]}>
          {superheroes.map((hero) => (
            <div key={hero.id} className={styles["superhero-list__hero-card"]}>
              <div className={styles["superhero-list__image-wrapper"]}>
                {hero.images?.[0] ? (
                  <img
                    className={styles["superhero-list__image"]}
                    src={`http://localhost:3001${hero.images[0].url}`}
                    alt={hero.nickname}
                  />
                ) : (
                  <div className={styles["superhero-list__placeholder"]}>
                    No Image
                  </div>
                )}
              </div>

              <div className={styles["superhero-list__info"]}>
                <div className={styles["superhero-list__nickname"]}>
                  {hero.nickname}
                </div>

                <div className={styles["superhero-list__buttons"]}>
                  <Link to={`/superheroes/${hero.id}`}>
                    <button className={styles["superhero-list__view-button"]}>
                      View Details
                    </button>
                  </Link>

                  <button
                    className={styles["superhero-list__delete-button"]}
                    onClick={() => handleDelete(hero.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles["superhero-list__pagination"]}>
        <button
          className={styles["superhero-list__pagination-button"]}
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className={styles["superhero-list__pagination-text"]}>
          Page {page} of {totalPages}
        </span>
        <button
          className={styles["superhero-list__pagination-button"]}
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SuperheroList;
