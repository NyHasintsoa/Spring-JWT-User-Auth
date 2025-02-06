function DetailUserItem({ title, value }) {
  return (
    <>
      <li className="list-group-item py-2">
        <span className="fw-bold">{title} :</span>
        <span className="ms-1 mb-0">{value}</span>
      </li>
    </>
  );
}

export default DetailUserItem;
