import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

//import collections
import { Items } from '../../api/items.js';
import { Categories } from '../../api/categories.js';

//import components
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import Loading from '../Loading.jsx';

class GooglePlayItemSubmitForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: '',
      appId: '',
      lang: '',
      country: '',
      actionProgress: false
    };
  }

  handleGoogleCategoryChange(event, index, value) {
    this.setState({
      category: value
    });
  }

  handleGoogleAppIdInputChange(event) {
    this.setState({
      appId: event.target.value
    });
  }

  handleGoogleLangInputChange(event) {
    this.setState({
      lang: event.target.value
    });
  }

  handleGoogleCountryInputChange(event) {
    this.setState({
      country: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let appIdInput = this.state.appId;
    let category = this.state.category;
    let lang = this.state.lang;
    let country = this.state.country;

    let splitter = appIdInput.split("id=");

    let appId = '';
    if (splitter.length === 2) {
      //provided url
      appId = splitter[1];
    } else if (splitter.length === 1) {
      //provided appId
      appId = splitter[0];
    }

    console.log(appId);
 
    if (appId === '' || category === ''
      || lang === '' || country === '') {
      alert('Hemme maglumatlary giriziň');
    } else {

      let self = this;
      
      self.setState({
        actionProgress: true
      });

      Meteor.call('items.insertInServerFromGooglePlay', 
        appId, category, lang, country, function(err, res) {
        if (err) {
          self.setState({
            actionProgress: false
          });

          alert(err);
          console.log(err);
        } else {
          self.setState({
            actionProgress: false
          });

          alert(res);
          console.log(res);
        }
      });
      this.setState({
        appId: ''
      });
    }
  }

  renderCategories() {
    let categories = this.props.categories;
    return categories.map((category) => {
      return (
        <MenuItem 
          value={category.categorySlug} 
          key={category._id}
          primaryText={category.categoryName}
        />
      );
    });
  }

  renderForm() {
    return (
      <div>
        
        <div className="section center" style={{paddingTop: 20, paddingBottom: 0}}>
          <h1 className="heading">Google Play üçin:</h1>
        </div>

        <div style={{padding: 15, margin: 15}}>
          <TextField
            hintText='Google Play Id ýa-da Google Play URL'
            floatingLabelText='Google Play Id ýa-da Google Play URL'
            fullWidth={true}
            onChange={this.handleGoogleAppIdInputChange.bind(this)}
            value={this.state.appId}
          />

          <SelectField 
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            value={this.state.category} 
            onChange={this.handleGoogleCategoryChange.bind(this)}
            maxHeight={400}
            fullWidth={true}
          >
            <MenuItem
              value='1'
              key='cv'
              primaryText='Kategoriýa saýla'
            />
            {this.renderCategories()}
          </SelectField>

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Diliň kody (ru, en, tm)'
            floatingLabelText='Diliň kody (ru, en, tm)'
            onChange={this.handleGoogleLangInputChange.bind(this)}
            value={this.state.lang}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Ýurduň kody (Diňe ru ýa-da tm!!!)'
            floatingLabelText='Ýurduň kody (Diňe ru ýa-da tm!!!)'
            onChange={this.handleGoogleCountryInputChange.bind(this)}
            value={this.state.country}
            fullWidth={true}
          />

          <RaisedButton 
            primary={true}
            label="Goşmak" 
            fullWidth={true} 
            style={{marginTop: 10}}
            onClick={this.handleSubmit.bind(this)}
          />
        </div>
      </div>
    ) 
  }

  render() {
    if (this.state.actionProgress) {
      return (
        <div style={{
            width: '250px', 
            margin: 'auto', 
            paddingTop: '50px',
            textAlign: 'center'
          }}
        >
          <CircularProgress/>
          <br/>
          <h5>Programma goşulýar...</h5>
        </div>
      );
    } else {
      if (this.props.categories) {
        return this.renderForm();
      } else  {
        return (
          <Loading />
        );
      }
    }
  }
}

GooglePlayItemSubmitForm.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default createContainer(({params}) => {

  const subs = Meteor.subscribe('categories');
  const categories = Categories.find({}, {sort: {categoryName: 1}}).fetch();

  return {
    categories
  };

}, GooglePlayItemSubmitForm);

