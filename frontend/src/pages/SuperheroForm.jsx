import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createSuperhero,
  updateSuperhero,
  fetchSuperheroById,
  uploadImages,
  deleteImage,
} from "../api/superhero";
import styles from "../styles/SuperheroForm.module.scss";

const SuperheroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadHero = async () => {
      try {
        setLoading(true);
        const hero = await fetchSuperheroById(id);

        setForm({
          nickname: hero.nickname ?? "",
          realName: hero.realName ?? "",
          originDescription: hero.originDescription ?? "",
          superpowers: hero.superpowers ?? "",
          catchPhrase: hero.catchPhrase ?? "",
        });

        setExistingImages(hero.images || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (imageId) => {
    setRemovedImageIds((prev) => [...prev, imageId]);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hero = id
        ? await updateSuperhero(id, form)
        : await createSuperhero(form);
      if (removedImageIds.length) {
        await Promise.all(
          removedImageIds.map((imageId) => deleteImage(hero.id, imageId))
        );
      }
      
      if (newImages.length) {
        await uploadImages(hero.id, newImages);
      }

      navigate(`/superheroes/${hero.id}`);
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return (
    <div className={styles["superhero-form"]}>
      <h1 className={styles["superhero-form__title"]}>
        {id ? "Edit Superhero" : "Create Superhero"}
      </h1>

      {loading ? (
        <p className={styles["superhero-form__loading"]}>Loading...</p>
      ) : (
        <form
          className={styles["superhero-form__form"]}
          onSubmit={handleSubmit}
        >
          {[
            ["nickname", "Nickname"],
            ["realName", "Real Name"],
            ["catchPhrase", "Catch Phrase"],
          ].map(([name, label]) => (
            <div key={name} className={styles["superhero-form__field"]}>
              <label className={styles["superhero-form__label"]}>{label}</label>
              <input
                className={styles["superhero-form__input"]}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={name !== "catchPhrase"}
              />
            </div>
          ))}

          {[
            ["originDescription", "Origin Description"],
            ["superpowers", "Superpowers"],
          ].map(([name, label]) => (
            <div key={name} className={styles["superhero-form__field"]}>
              <label className={styles["superhero-form__label"]}>{label}</label>
              <textarea
                className={styles["superhero-form__textarea"]}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className={styles["superhero-form__field"]}>
            <label className={styles["superhero-form__label"]}>
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className={styles["superhero-form__file"]}
              onChange={(e) =>
                setNewImages((prev) => [...prev, ...Array.from(e.target.files)])
              }
            />
          </div>

          {(existingImages.length > 0 || newImages.length > 0) && (
            <div className={styles["superhero-form__images"]}>
              {existingImages.map((img) => (
                <div
                  key={img.id}
                  className={styles["superhero-form__image-item"]}
                >
                  <img
                    src={`http://localhost:3001${img.url}`}
                    alt=""
                    className={styles["superhero-form__image"]}
                  />
                  <button
                    type="button"
                    className={styles["superhero-form__remove-image"]}
                    onClick={() => handleRemoveImage(img.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {newImages.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className={styles["superhero-form__image"]}
                />
              ))}
            </div>
          )}

          <div className={styles["superhero-form__actions"]}>
            <button
              type="submit"
              className={`${styles["superhero-form__button"]} ${styles["superhero-form__button--save"]}`}
            >
              Save
            </button>
            <button
              type="button"
              className={`${styles["superhero-form__button"]} ${styles["superhero-form__button--cancel"]}`}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SuperheroForm;
