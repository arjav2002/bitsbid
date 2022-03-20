import background from "../img/bg3.jpg";
import "./Sell.css"

const Sell = () => {

  return (
    <div className="bg-image">
      <div className="dark-overlay">
        
      </div>
      <div className="row">
        <div className="col-md-12 text-center mt-5 h1">
          Post Your Item !
        </div>
      </div>
        <form>
        <div className="row justify-content-md-center align-items-center mt-5">
        <div className="col-md-1 text-center">Title</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="title" className="form-control" aria-describedby="emailHelp" placeholder="Enter title" />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-1 text-center">End Date</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="title" className="form-control" aria-describedby="emailHelp" placeholder="dd-mm-yyyy" />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-1 text-center">Minimum Bid</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="title" className="form-control" aria-describedby="emailHelp" placeholder="Enter amount in Rs." />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-1 text-center">Description</div>
          <div className="col-md-4 text-center">
            <div className="form-group">
              <input type="title" className="form-control" aria-describedby="emailHelp" placeholder="Enter description" />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-1 text-center">Image</div>
          <div className="col-md-4 text-start">
            <div className="form-group">
              <input type="file" className="form-control-file"/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center align-items-center mt-4">
          <div className="col-md-4 text-center mt-5">
          <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>

        </form>
    </div>
  )
}

export default Sell