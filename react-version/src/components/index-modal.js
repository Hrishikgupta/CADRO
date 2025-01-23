import React from "react"

const IndexModal = () => (
    <div className="modal fade" id="locationChoiceModal" tabIndex="-1" role="dialog" aria-labelledby="locationChoiceModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Location Options</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div className="modal-body">
        <p>There are multiple possible choices, please choose:</p>
        <div className="list-group"></div>
    </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
)

export default IndexModal