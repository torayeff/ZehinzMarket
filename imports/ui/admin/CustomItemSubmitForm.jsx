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

class CustomItemSubmitForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      summary: '',
      score: '',
      developer: '',
      developerEmail: '',
      developerWebsite: '',
      version: '',
      size: '',
      description: '',
      androidVersion: '',
      url: '',
      appId: '',
      category: '',
      actionProgress: false
    };
  }

  handleTitleInputChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleSummaryInputChange(event) {
    this.setState({
      summary: event.target.value
    });
  }

  handleScoreInputChange(event) {
    this.setState({
      score: event.target.value
    });
  }

  handleDeveloperInputChange(event) {
    this.setState({
      developer: event.target.value
    });
  }

  handleDeveloperWebsiteInputChange(event) {
    this.setState({
      developerWebsite: event.target.value
    });
  }

  handleDeveloperEmailInputChange(event) {
    this.setState({
      developerEmail: event.target.value
    });
  }

  handleVersionInputChange(event) {
    this.setState({
      version: event.target.value
    });
  }

  handleSizeInputChange(event) {
    this.setState({
      size: event.target.value
    });
  }

  handleDescriptionInputChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleAndroidVersionInputChange(event) {
    this.setState({
      androidVersion: event.target.value
    });
  }

  handleUrlInputChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleAppIdInputChange(event) {
    this.setState({
      appId: event.target.value
    });
  }

  handleCategoryChange(event, index, value) {
    this.setState({
      category: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    let title = this.state.title;
    let summary = this.state.summary;
    let score = this.state.score;
    let developer = this.state.developer;
    let developerEmail = this.state.developerEmail;
    let developerWebsite = this.state.developerWebsite;
    let version = this.state.version;
    let size = this.state.size;
    let description = this. state.description;
    let androidVersion = this.state.androidVersion;
    let url = this.state.url;
    let appId = this.state.appId;
    let category = this.state.category;

    if (
        title === '' ||
        summary === '' ||
        score === '' || 
        developer === '' ||
        developerEmail === '' ||
        developerWebsite === '' ||
        version === '' ||
        size === '' ||
        description === '' ||
        androidVersion === '' ||
        url === '' ||
        appId === '' ||
        category === ''
        ) {
      alert('Hemme maglumatlary giriziň');
    } else {
      let customItem = {
        title,
        summary,
        score,
        developer,
        developerEmail,
        developerWebsite,
        version,
        size,
        description,
        androidVersion,
        url,
        appId,
        category
      };
      let self = this;
      
      self.setState({
        actionProgress: true
      });

      Meteor.call('customItems.insert', 
        customItem, function(err, res) {
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
        title: '',
        summary: '',
        score: '',
        developer: '',
        developerEmail: '',
        developerWebsite: '',
        version: '',
        size: '',
        description: '',
        androidVersion: '',
        url: '',
        appId: '',
        category: ''
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
          <h1 className="heading">Google Play-da bolmadyklar üçin:</h1>
          <div style={{textAlign: 'left'}}>
            <ol>
              <li>
                Programmanyň Id atly papka döretmeli. (Mundan beýläk esasy papka)
                 Meselem: <b>com.zehinz.goool</b>
                </li>
              <li>
                Programmanyň adyny appId.apk görnüşde esasy papkanyň içine salmaly.
                Meselem: <b>com.zehinz.goool.apk</b>
              </li>
              <li>
                Esasy papkanyň içine <b>icon.png</b> atly YxY piksellik suraty ýerleşdirmeli.
              </li>
              <li>
                Esasy papkanyň içinde <b>screenshots</b> atly papka döretmeli.
              </li>
              <li>
                <b>screenshots</b> papkanyň içinde <b>screenshot1.jpg</b>,&nbsp;
                <b>screenshot2.jpg</b>,&nbsp;<b>screenshot3.jpg</b>,&nbsp;<b>screenshot4.jpg</b> 
                &nbsp;atly 4 sany programmanyň suratlaryny ýerleşdirmeli.
              </li>
              <li>
                Meselem:<br/>
                <b>com.zehinz.gool/</b><br/>
                ---<b>com.zehinz.goool.apk</b><br/>
                ---<b>icon.png</b><br/>
                ---<b>screenshots/</b><br/>
                ------<b>screenshot1.jpg</b><br/>
                ------<b>screenshot2.jpg</b><br/>
                ------<b>screenshot3.jpg</b><br/>
                ------<b>screenshot4.jpg</b><br/>
              </li>
              <li>
                CDN Serwere goşup aşakyny doldurmaly.
              </li>
            </ol> 
          </div>
        </div>

        <div style={{padding: 15, margin: 15}}>
          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Ady (title)'
            floatingLabelText='Ady (title)'
            fullWidth={true}
            onChange={this.handleTitleInputChange.bind(this)}
            value={this.state.title}
          />

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Gysgaça mazmuny (summary)'
            floatingLabelText='Gysgaça mazmuny (summary)'
            onChange={this.handleSummaryInputChange.bind(this)}
            value={this.state.summary}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Ýyldyz sany (score) 1 we 5 arasynda'
            floatingLabelText='Ýyldyz sany (score) 1 we 5 arasynda'
            onChange={this.handleScoreInputChange.bind(this)}
            value={this.state.score}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Dörediji (developer)'
            floatingLabelText='Dörediji (developer)'
            onChange={this.handleDeveloperInputChange.bind(this)}
            value={this.state.developer}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 0, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Döredijiniň e-mail (developerEmail)'
            floatingLabelText='Döredijiniň e-mail (developerEmail)'
            onChange={this.handleDeveloperEmailInputChange.bind(this)}
            value={this.state.developerEmail}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Döredijiniň web saýty http://... (developerWebsite)'
            floatingLabelText='Döredijiniň web saýty http://... (developerWebsite)'
            onChange={this.handleDeveloperWebsiteInputChange.bind(this)}
            value={this.state.developerWebsite}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Wersiýasy (version ex. 1.0.1)'
            floatingLabelText='Wersiýasy (version ex. 1.0.1)'
            onChange={this.handleVersionInputChange.bind(this)}
            value={this.state.version}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Agramy (size, ex: 5.6M)'
            floatingLabelText='Agramy (size, ex: 5.6M)'
            onChange={this.handleSizeInputChange.bind(this)}
            value={this.state.size}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Mazmuny (description)'
            floatingLabelText='Mazmuny (description)'
            onChange={this.handleDescriptionInputChange.bind(this)}
            value={this.state.description}
            multiLine={true}
            rows={5}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Android wersiýasy (androidVersion)'
            floatingLabelText='Android wersiýasy (androidVersion)'
            onChange={this.handleAndroidVersionInputChange.bind(this)}
            value={this.state.androidVersion}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='Programmanyň web saýty http://... (url) ýa-da /item/appId'
            floatingLabelText='Programmanyň web saýty http://... (url) ýa-da /item/appId'
            onChange={this.handleUrlInputChange.bind(this)}
            value={this.state.url}
            fullWidth={true}
          />

          <TextField
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            hintText='App Id (appId, ex: com.zehinz.shygyrlar)'
            floatingLabelText='App Id (appId, ex: com.zehinz.shygyrlar)'
            onChange={this.handleAppIdInputChange.bind(this)}
            value={this.state.appId}
            fullWidth={true}
          />

          <SelectField 
            style={{marginTop: 10, paddingTop: 0, backgroundColor: '#FFFFFF'}}
            value={this.state.category} 
            onChange={this.handleCategoryChange.bind(this)}
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

CustomItemSubmitForm.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default createContainer(({params}) => {

  const subs = Meteor.subscribe('categories');
  const categories = Categories.find({}, {sort: {categoryName: 1}}).fetch();

  return {
    categories
  };

}, CustomItemSubmitForm);

