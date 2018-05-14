import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//import collections
import { Banners } from '../../api/banners.js';


//import components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import BannerCard from './BannerCard.jsx';
import Loading from '../Loading.jsx';

class FeaturedBanners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: '',
      text1: '',
      text2: '',
      link: ''
    }
  }

  handleImgSrcInputChange(event) {
    this.setState({
      imgSrc: event.target.value
    });
  }

  handleText1InputChange(event) {
    this.setState({
      text1: event.target.value
    });
  }

  handleText2InputChange(event) {
    this.setState({
      text2: event.target.value
    });
  }

  handleLinkInputChange(event) {
    this.setState({
      link: event.target.value
    });
  }

  handleSubmit(event) {
    let imgSrc = this.state.imgSrc;
    let text1 = this.state.text1;
    let text2 = this.state.text2;
    let link = this.state.link;

    if (imgSrc === '' || text1 === ''
      || text2 === '' || link === '') {
      alert('Hemme maglumatlary giriziň');
    } else {
      Meteor.call('banners.insert', imgSrc, text1, text2, link, function(err, res) {
        if (err) {
          console.log(err);
          alert(err);
        } else {
          console.log(res);
          alert(res);
        }
      });
      
      this.setState({
        imgSrc: '',
        text1: '',
        text2: '',
        link: ''
      });
    }

  }

  renderBannersList() {
    let banners = this.props.banners;
    return banners.map((banner) => {
      return (
        <BannerCard banner={banner} key={banner._id}/>
      );
    });
  }

  newBannerForm() {
    return (
      <div>
        
        <div className="section center" style={{paddingTop: 20, paddingBottom: 0}}>
          <h3 className="heading">Täze Banner</h3>
        </div>

        <div style={{padding: 15, margin: 15}}>
          <TextField
            hintText='Surat (700x467, 50kb) URL (http://...)'
            fullWidth={true}
            onChange={this.handleImgSrcInputChange.bind(this)}
            value={this.state.imgSrc}
          />

          <TextField
            hintText='Gysgaça tekst 1 (ýokarky)'
            onChange={this.handleText1InputChange.bind(this)}
            value={this.state.text1}
            fullWidth={true}
          />

          <TextField
            hintText='Gysgaça tekst 2 (aşaky)'
            onChange={this.handleText2InputChange.bind(this)}
            value={this.state.text2}
            fullWidth={true}
          />

          <TextField
            hintText='Link (http://...)'
            onChange={this.handleLinkInputChange.bind(this)}
            value={this.state.link}
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
    if (!this.props.loading) {
      return (
        <div>
          {this.newBannerForm()}
          <hr/>
          <div className="section center" style={{paddingTop: 20, paddingBottom: 0}}>
            <h3 className="heading">Goşulan Bannerlar</h3>
          </div>
          {this.renderBannersList()}
        </div>
      )
    } else {
      return (
        <Loading />
      );
    }
  }
}

FeaturedBanners.propTypes = {
  banners: PropTypes.array,
}

export default createContainer(({params}) => {

  const subs = Meteor.subscribe('bannersForAdmin');
  const loading = !subs.ready()
  let banners = Banners.find({}, {sort: {createdAt: -1}}).fetch();

  return {
    banners,
    loading
  };

}, FeaturedBanners);
