import React from 'react'

export default function Popup(props) {
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
                    {/* <button type="button" 
                    className="btn btn-primary" 
                    data-toggle="modal" 
                    data-target="#mainModal"
                    >
                    Launch demo modal
                    </button> */}
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="mainModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            { props.children }
                            <div className="modal-footer flex-wrap">
                                <button 
                                type="button" 
                                className="btn"
                                data-dismiss="modal"
                                 
                                >Cacnel</button>
                                <button 
                                type="button" 
                                className="btn btn-danger"
                                data-dismiss="modal"
                                 onClick={props.confirmDelete}
                                >Delete</button>
                            </div>
                        </div>
                    </div>
                    </div>
        </div>
    )
}
