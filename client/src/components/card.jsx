const Card = (data) => {
  return (
    <div className="card">
      <div className="card-body">
        <img src="/images/sunflowers.jpg" className="card-image" alt="" />
        <h2 className="card-title">{data.galleryData.title}</h2>
        <p className="card-artistname">{data.galleryData.artistname}</p>
        <p className="card-description">{data.galleryData.description}</p>
      </div>
    </div>
  );
};

export default Card;
