import React from "react"

const ErrorModal = () => (
    <div className="modal fade" id="error-modal" tabIndex="-1" role="dialog" aria-labelledby="error-modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Warning!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <p id="error-modal-text"></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
)

export default ErrorModal