import React, { useState, Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DoneMarker from '@material-ui/icons/CheckCircleOutline';
import NotDoneMarker from '@material-ui/icons/KeyboardArrowRight';
import AttachMarker from '@material-ui/icons/AttachFile';
import TravelHistoryMarker from '@material-ui/icons/Public';

import FormModal from './FormModal';
import AboutYouForm from './AboutYouForm';
import ResidencyForm from './ResidencyForm';
import VisaForm from './VisaForm';
import UploadW2Form from './UploadW2Form';

import { withAuthorization, AuthUserContext } from '../Session';
import './styles.css';
import './summary-card.css';

import { parseW2 } from '../../utils/FileUtils';
import { scrapI94 } from '../../utils/ScrapUtils';
import { getUserCompletion } from '../../utils/DBUtils';

class HomePageInContext extends Component {
  state = { completion: null };

  async componentDidMount() {
    const completion = await getUserCompletion(
      this.props.firebase,
      this.props.authUser
    );
    this.setState({ completion });
  }

  render() {
    if (this.state.completion == null) {
      return null;
    }
    return (
      <div className="overview-container">
        <SummaryCard fedReturn={1000000} />
        <OverviewCard
          completed={this.state.completion[0]}
          FormProp={AboutYouForm}
        >
          About You
        </OverviewCard>
        <OverviewCard 
          completed={this.state.completion[1]} 
          FormProp={ResidencyForm}
        >
          Residency Info
        </OverviewCard>
        <OverviewCard
          completed={this.state.completion[2]}
          FormProp={VisaForm}
        >
          Visa Info
        </OverviewCard>
        <OverviewCard
          completed={this.state.completion[3]}
          FormProp={UploadW2Form}
          icon={AttachMarker}
        >
          Upload Your W2
        </OverviewCard>
        {/* <input type="file" onChange={e => parseW2(e.target.files[0], firebase)} /> */}
        <button
          onClick={() => {
            // scrapI94(
            //   {
            //     fn: 'Harvey',
            //     ln: 'Wu',
            //     bd: '05',
            //     bm: 'February',
            //     by: '1996',
            //     pp: 'GK935918',
            //     pc: 'Canada'
            //   },
            //   // firebase
            // );
          }}
        />
      </div>
    );
  }
}

const HomePage = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <HomePageInContext firebase={firebase} authUser={authUser} />
      )}
    </AuthUserContext.Consumer>
  );
};

const SummaryCard = ({ fedReturn }) => {
  return (
    <Paper className="summary-card" square={false} elevation={1}>
      <div className="refund-card">
        <Typography component="p">Fed Return:</Typography>
        <Typography variant="h5" component="h3">
          ${fedReturn}
        </Typography>
      </div>
      <div className="splitter" />
      <div className="refund-card">
        <Typography component="p">State Return:</Typography>
        <Typography variant="h5" component="h3">
          -
        </Typography>
      </div>
    </Paper>
  );
};

const OverviewCard = ({ children, FormProp, completed, icon }) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div>
      <Paper
        className="overview-card"
        onClick={() => setModalOpened(true)}
        square={false}
        elevation={1}
      >
        {icon ? (
          <AttachMarker className="progress-marker" />
        ) : completed ? (
          <DoneMarker className="progress-marker" />
        ) : (
          <NotDoneMarker className="progress-marker" />
        )}

        <Typography className="section-name" variant="h5" component="h4">
          {children}
        </Typography>
      </Paper>
      {modalOpened ? (
        <FormModal
          show={modalOpened}
          toggleModal={() => setModalOpened(!modalOpened)}
        >
          <FormProp
            onSubmit={() => {
              setModalOpened(!modalOpened);
            }}
          />
        </FormModal>
      ) : null}
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
