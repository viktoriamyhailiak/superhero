import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createSuperhero,
  updateSuperhero,
  fetchSuperheroById,
  uploadImages,
} from "../api/superhero";
import "../styles/SyperheroForm.scss";

const SuperheroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
  });

  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadHero = async () => {
      try {
        setLoading(true);
        const data = await fetchSuperheroById(id);

        setHeroData({
          nickname: data.nickname ?? "",
          realName: data.realName ?? "",
          originDescription: data.originDescription ?? "",
          superpowers: data.superpowers ?? "",
          catchPhrase: data.catchPhrase ?? "",
        });

        setExistingImages(data.images || []);
      } catch (err) {
        console.error("Failed to load superhero", err);
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hero = id
        ? await updateSuperhero(id, heroData)
        : await createSuperhero(heroData);

      if (files.length > 0) {
        await uploadImages(hero.id, files);
      }

      navigate(`/superheroes/${hero.id}`);
    } catch (err) {
      console.error("Failed to save superhero", err);
    }
  };

  return (
    <div className="superhero-form-container">
      <h1>{id ? "Edit Superhero" : "Create Superhero"}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Nickname</label>
          <input
            name="nickname"
            value={heroData.nickname}
            onChange={handleChange}
            required
          />

          <label>Real Name</label>
          <input
            name="realName"
            value={heroData.realName}
            onChange={handleChange}
            required
          />

          <label>Origin Description</label>
          <textarea
            name="originDescription"
            value={heroData.originDescription}
            onChange={handleChange}
            required
          />

          <label>Superpowers</label>
          <textarea
            name="superpowers"
            value={heroData.superpowers}
            onChange={handleChange}
            required
          />

          <label>Catch Phrase</label>
          <input
            name="catchPhrase"
            value={heroData.catchPhrase}
            onChange={handleChange}
          />

          <label>Upload Images</label>
          <input type="file" multiple onChange={handleFilesChange} />

          {existingImages.length > 0 && (
            <div className="images-preview">
              {existingImages.map((img) => (
                <img
                  key={img.id}
                  src={`http://localhost:3001${img.url}`}
                  alt={heroData.nickname}
                />
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="images-preview">
              {files.map((file, idx) => (
                <img key={idx} src={URL.createObjectURL(file)} alt="preview" />
              ))}
            </div>
          )}

          <div className="buttons">
            <button type="submit" className="save">
              Save
            </button>
            <button
              type="button"
              className="cancel"
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
