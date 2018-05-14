import React, { Component, Proptypes } from 'react';
import { Meteor } from 'meteor/meteor';

//importing components
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

export default class AppUpdaterCron extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="section center" style={{paddingTop: 20, paddingBottom: 0}}>
          <h1 className="heading">Täzeleýji Cron</h1>
        </div>
        <div>
          <TextField
            style={{margin: 15, paddingBottom: 24, paddingTop: 24, width: '70%'}}
            hintText="every 5 minutes"
            floatingLabelText="Iňlisçe wagtyny ýazmaly"
          />

          <IconButton 
            tooltip="Täze işi başlat"
          >
            <ActionSchedule/>
          </IconButton>

          <IconButton 
            tooltip="Işi bes et"
          >
            <ActionPowerSettingsNew/>
          </IconButton>


        </div>
      </div>
    );
  }
}