import React from 'react';
import './ListItem.scss'
export default function ListItem(props) {
    return (
        <React.Fragment>
               
            <div className="list-item list-group-item d-flex justify-content-between mb-3">
                <div className="list-name">
                    <h5 className="text-capitalize">{ props.name }</h5>
                    <p className="m-0">is your friend</p>
                </div>
                <div className="list-option d-flex align-items-center">
                    <div
                    onClick={ props.favAdd }
                        className="glyphicon glyphicon-star border mr-2 bg-success text-center d-flex align-items-center justify-content-center">
                        <i className={"fa fa-star"+(props.favStar ? '': '-o')}  aria-hidden="true"></i>
                    </div>
                    <div
                    data-toggle="modal" 
                    data-target="#mainModal"
                    onClick={ props.itemDelete }
                        className="del-block border bg-danger text-center d-flex align-items-center justify-content-center">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
