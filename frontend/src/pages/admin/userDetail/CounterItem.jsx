import { Card } from "react-bootstrap";

function CounterItem({ item }) {
  return (
    <div className="col-lg-4">
      <Card className="card-body border border-primary bg-primary bg-opacity-10 border-opacity-25 p-4 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0 fw-bold">{item.number}</h3>
            <span className="mb-0 h6 fw-light">{item.label}</span>
          </div>
          <div className="icon-lg rounded-circle flex-shrink-0 bg-primary text-white mb-0">
            {item.icon}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CounterItem;
