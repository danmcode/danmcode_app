

export default function Home() {
  return (
    <div className="pb-5">
      <div className="row g-4">
        <div className="col-12 col-xxl-6">
          <div className="mb-8">
            <h2 className="mb-2">Dashboard</h2>
            <h5 className="text-body-tertiary fw-semibold">
              Esto es lo que está pasando en su establecimiento en este momento
            </h5>
          </div>

          <div className="row align-items-center g-4">

          </div>

          <hr className="bg-body-secondary mb-6 mt-4" />

          <div className="row flex-between-center mb-4 g-3">
            <div className="col-auto">
              <h3>Total sells</h3>
              <p className="text-body-tertiary lh-sm mb-0">
                Payment received across all channels
              </p>
            </div>
            <div className="col-8 col-sm-4">
              <select
                className="form-select form-select-sm"
                id="select-gross-revenue-month"
              >
                <option>Mar 1 - 31, 2022</option>
                <option>April 1 - 30, 2022</option>
                <option>May 1 - 31, 2022</option>
              </select>
            </div>
          </div>
          <div className="echart-total-sales-chart"></div>
          
        </div>

        <div className="col-12 col-xxl-6">
          <div className="row g-3">

          </div>
        </div>
      </div>
    </div>
  );
}
