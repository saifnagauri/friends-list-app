import './Friends-list.scss';

import React, { Component } from 'react';
import Pagination from "../../Components/Pagination/Pagination";
import ListItem from '../../Components/List-item/ListItem';
import Popup from '../../Components/Popup/Popup';
import PopupInternal from '../../Components/PopupInternal/PopupInternal';


export default class FriendsList extends Component {

    state = {
        mainList : [
            {name:'Ajay',fav:true},
            {name:'Brijesh',fav:false},
            {name:'Chetan',fav:true},
            {name:'Deepak',fav:false},
            {name:'Elina',fav:false},
        ],
        totalPages: "",
        pageLimit: "",
        currentPage: "",
        startIndex: "",
        endIndex: "",
        serachVal : '',
        favClick : false,
        newFriendVal : '',
        error: '',
        favBtnHide : false,
        pageLimit: '',
        deleteId:0
    }

    handleClick(number) {
        this.setState(
            {
                currentPage : number
            }
        )
      }


    searchHandler = (e) =>{
        this.setState({
            serachVal : e.target.value,
            favBtnHide : e.target.value.length > 0 ? true : false 
        })
        //console.log(this.state.serachVal);
        //console.log(e.target.value.length);
    }

    //Add Input Handler

    addInputHandler = (e) =>{

            this.setState({
                newFriendVal : e.target.value
            })
      
    }

    //Adding new Friend

    addHandler = () =>{
        if(this.state.newFriendVal.length > 0){
            const updateMainList = [...this.state.mainList];
            updateMainList.unshift(
                {name:this.state.newFriendVal,fav:0}
            )
            this.setState(
                {
                    mainList : updateMainList,
                    newFriendVal : '',
                    error: '',
                }
            );
            }else{
            this.setState({
                error: 'Please enter a friend name'
            });
        }
    }

    //Show Favorite Handler

    favHandler = () => {

        // console.log(this.state.favClick);

        const sortedList = [...this.state.mainList];

        if(!this.state.favClick){
            sortedList.sort((a,b) => a.fav-b.fav).reverse()
            this.setState(
                { 
                    favClick : !this.state.favClick,
                    mainList : sortedList
                }
            ) 
        }
        else{
            sortedList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            this.setState(
                { 
                    favClick : !this.state.favClick,
                    mainList : sortedList
                }
            ) 
        }
    }

    addToFav = (index) =>{
        const updateMainList = [...this.state.mainList];
        const updateFavItem = updateMainList[index]
        updateFavItem.fav = !updateMainList[index].fav
        updateMainList.splice(index,updateFavItem)
        this.setState(
            {
                mainList : updateMainList
            }
        )
    }

    //Delete Friend Handler

    delFriendHandler = (index) => {
        this.setState(
            {
                deleteId : index
            }
        )
    }

    conDeleteFriendHandler = () =>{

        

        const updateMainList = [...this.state.mainList];
        updateMainList.splice(this.state.deleteId,1);
        this.setState(
            {
                mainList : updateMainList,
            }
        )

        //console.log(this.state.mainList.length - 1);

    }

    onChangePage(data){
        this.setState({
          pageLimit: data.pageLimit,
          totalPages: data.totalPages,
          currentPage: data.page,
          startIndex: data.startIndex,
          endIndex: data.endIndex
        });
    };

    onEnterHandler = (e) =>{
        if(e.keyCode === 13) {
            this.addHandler()
        }
    }


    render() {

        // console.log(this.state.mainList.slice(0,4));
        let count = 0
        this.state.mainList.map(
            (item)=> {
                if(item.fav === true){
                    count = count + 1
                }
            }
        )

        let filterList =  this.state.mainList.filter(
                              (item) =>{
                                  return item.name.toLowerCase().search(this.state.serachVal.toLowerCase()) !== -1
                              }
                            )

        let rowsPerPage = filterList.slice(this.state.startIndex, this.state.endIndex + 1);

        let mainFilterList = filterList && filterList.length ? rowsPerPage.map((item,index) => {
            // console.log("last map result");
            // console.log(item);
                return (
                    <ListItem 
                    key={ index } 
                    name={item.name} 
                    favStar={item.fav}
                    favAdd={ ()=>this.addToFav(index) }
                    itemDelete={ ()=>this.delFriendHandler(index) }>                                       
                    </ListItem>                  
                )
            }) : <div className="p-3 font-weight-bold text-danger text-capitalize">No Data to display</div>;

        return (
            <React.Fragment>
                <div className="main-content container">
                    <div className="inner-wrap">
                        <div className="title-row flex-wrap mb-3 pb-3 border-b">
                            <div className="coll">
                                <h5 className="m-0 ">Friends List</h5>
                            </div>
                            <div className="coll serach-box">
                                <input 
                                className="" 
                                type="text"placeholder="Search by Name..."
                                value={ this.state.serachVal } 
                                onChange={ (e)=> this.searchHandler(e) }
                                />
                            </div>
                        </div>
                    
                    <div className="serach-box flex-center ">
                        <input 
                        className="" 
                        type="text"
                        placeholder="Add New Friend"

                        value={ this.state.newFriendVal } 
                        onChange={ (e)=> this.addInputHandler(e) }
                        onKeyDown={ this.onEnterHandler }
                        />
                        <button
                        onClick={ this.addHandler } 
                        className="ml-3 btn-success font-weight-bold"
                        >Add</button>
                    </div>
                    {this.state.error ? <p className="error">{this.state.error}</p> : null }
                    <div className="fav-btn mt-3 text-right">
                        <button 
                        className="btn btn-info"
                        onClick={ this.favHandler }
                        disabled={!count}
                        hidden={this.state.favBtnHide}
                        >{ this.state.favClick ? 'Show All' : 'Show Favorites' } </button>
                    </div>
                    <div className="normal-list list-block list-group mt-3 mb-3">
                        { 
                            mainFilterList
                        }
                        {
                            filterList.length ? <Pagination
                            totalRecords={this.state.mainList.length}
                            pageLimit={this.state.pageLimit || 4}
                            initialPage={1}
                            pagesToShow={7}
                            onChangePage={(data) => this.onChangePage(data)}
                        /> : ''
                        }
                        
                    </div>

                    <Popup confirmDelete={ this.conDeleteFriendHandler }>
                        <PopupInternal
                        modalTitle="Delete Friend"
                        modalBody={this.state.mainList.length - 1 >= 0 ? "Are you sure that you want to delete " + this.state.mainList[this.state.deleteId].name : '' }
                        ></PopupInternal>
                    </Popup>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
