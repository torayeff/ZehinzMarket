import React, { Component, PropTypes } from 'react';

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="section center" style={{margin: 0, padding: 0, paddingTop: 20}}>
          <h1 className="heading">MAGLUMAT</h1>
        </div> 

        <div className="p-20" style={{textAlign: 'justify'}}>
          <p className="text-flow">
            <span className="dropcap">1</span>
            Programmalaryň hukuklary hakynda:
            Bu ýerdäki programmalaryň ählisiniň hukuklary diňe öz döredijilerine degişlidir. 
            ZEHINZ topary öz programmalaryndan başga görkezilen programmalaryň hiç birine eýelik etmeýär we 
            jogapkärçilik çekmeýär. Programmalaryň ählisi Google Play Marketdan ýörite saýlanyp alynýar, 
            programmalaryň düzümine, beýanyna ZEHINZ topary tarapyndan hiç hili üýtgeşme girizilmeýär, 
            şol sebäpden hem köp programmalaryň beýäny rus ýa-da iňlis dilindedir.<br/>
            Programmalaryň täze wersiýasy çykan ýagdaýynda diňe Google Play Marketdan awtomatiki ýagdaýda 
            ZEHINZ toparynyň serwerlerinde täzelenýär. <br/>
            Islendik programma hakynda sorag ýüze çyksa göniden-göni programmanyň döredijisine ýüz tutmalydyr.
          </p>

          <p className="text-flow">
            <span className="dropcap">2</span>
            Programmalaryň ýerleşdirilişi hakynda:
            Biz ähli programmalary Google Play Marketdan awtomatiki ýagdaýda alýarys. 
            Eger-de programma döredijileri biziň serwerlerimizde öz programmalaryny ýerleşdirmek isleseler 
            ýa-da ýerleşdirilen programmany aýyrmak isleseler programma eýeçilik etýän subutnamalary bilen 
            bize ýüz tutup bilerler.
          </p>

          <p className="text-flow">
            <span className="dropcap">3</span>
            Soraglaryňyz we teklipleriňiz üçin&nbsp;
            <a href="mailto:zehinz@gmail.com" 
            style={{color: '#01ACC6', textDecoration: 'underline'}}>zehinz@gmail.com</a> 
            &nbsp;elektron salgysyna ýüz tutup bilersiňiz.
          </p>
        </div>
        
        <div style={{textAlign: 'center', marginTop: -20, paddingBottom: 20}}>
          <i style={{fontSize: 18}}>Hormatlamak bilen, ZEHINZ topary!</i>
        </div>
      </div>
    )
  }
}