import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import TabChoose from './tab-choose';
import TabSetting from './tab-setting';
import TabSetting1 from './tab-setting1';

class CreateTMtabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      tabState: {
        tab1: true,
        tab2: false,
        tab3: false,
      },
    };
    this.Activekey = this.Activekey.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  Activekey(key) {
    console.log ("Activekeyy");
    this.setState({selectedTab:key});
  }

  handleTabState(tab,active) {

    this.setState({
      selectedTab:active,
      tabState: {
        ...this.state.tabState,
        [tab]: true,
      },
    }
    );
  }

  onSelect(event){
  //  console.log(event);
    if(this.state.tabState[`tab${event}`]){
    this.setState({selectedTab:event});
  }
    // todo : error message feedback
  }

  render() {
    if(!this.props.Selectedgame){
      return (<div>
        <Tabs
          defaultActiveKey={1}
          activeKey={this.state.selectedTab}
          onSelect={this.onSelect}
          id="createTM"
        >
          <Tab eventKey={1} title="Tab 1"><TabChoose /></Tab>
          <Tab eventKey={2} title="Tab 2" disable={this.state.tabState.tab2}><TabSetting /></Tab>
          <Tab eventKey={3} title="Tab 3" disable={this.state.tabState.tab3}>Tab 3 content</Tab>
        </Tabs>
        <button onClick={()=> this.handleTabState(`tab${this.state.selectedTab+1}`,this.state.selectedTab+1)}>next</button>
        </div>);
    }
    else if(this.props.Selectedgame.game=="League of Legend"){
    return (<div>
      <Tabs
        defaultActiveKey={1}
        activeKey={this.state.selectedTab}
        onSelect={this.onSelect}
        id="createTM"
      >
        <Tab eventKey={1} title="Tab 1"><TabChoose /></Tab>
        <Tab eventKey={2} title="Tab 2" disable={this.state.tabState.tab2}><TabSetting /></Tab>
        <Tab eventKey={3} title="Tab 3" disable={this.state.tabState.tab3}>Tab 3 content</Tab>
      </Tabs>
      <button onClick={()=> this.handleTabState(`tab${this.state.selectedTab+1}`,this.state.selectedTab+1)}>next</button>
      </div>);
    }

    else if(this.props.Selectedgame.game=="HearthStone"){
    return (<div>
      <Tabs
        defaultActiveKey={1}
        activeKey={this.state.selectedTab}
        onSelect={this.onSelect}
        id="createTM"
      >
        <Tab eventKey={1} title="Tab 1"><TabChoose /></Tab>
        <Tab eventKey={2} title="Tab 2" disable={this.state.tabState.tab2}><TabSetting1 /></Tab>
        <Tab eventKey={3} title="Tab 3" disable={this.state.tabState.tab3}>Tab 3 content</Tab>
      </Tabs>
      <button onClick={()=> this.handleTabState(`tab${this.state.selectedTab+1}`,this.state.selectedTab+1)}>next</button>
      </div>);
    }

  }

}

function mapStateToProps(state) {
if(!state.CreateTM){console.log("123");}
else {
  console.log(state.CreateTM.game);
}

  return {

    Selectedgame: state.CreateTM
  };
}

export default connect(mapStateToProps)(CreateTMtabs);