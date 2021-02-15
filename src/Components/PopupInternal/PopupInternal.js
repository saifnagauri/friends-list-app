import React from 'react'
import Popup from '../Popup/Popup'
import './PopupInternal.scss';

export default function PopupInternal(props) {
    return (
        <React.Fragment>
            <div className="modal-inner-wrap flex-wrap-top">
                <div className="coll svg-box flex-center">
                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <div className="coll">
                    <div className="modal-header flex-center">
                        <h5 className="modal-title" id="exampleModalLabel">{ props.modalTitle }</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { props.modalBody }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
