const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
const MAXSIZE = 25;
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class DisplayHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      display: 'block'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      display: prevState.isToggleOn ? 'none' : 'block'
    }));
  }
  handleClear(e) {
    e.preventDefault();
    var confirmWin = window.confirm('Are you sure to delete all the appointments in the waiting list?');
    if(confirmWin){
      const issue = {
        name: 'placeholder', 
        phone: '1'
      }
      this.props.clearUpIssues(issue);
      alert('Clear success!')
    }
  }
  render() {
    return (
      <div>
        <div className="HomeB">
          <button className="button buttonToHome" id="buttonToHome" onClick={this.handleClick}> <i className="fa fa-home">{this.state.isToggleOn ? '_off' : '_on'}</i> </button>
          <button className="button buttonClearAll" onClick = {this.handleClear} > Clear the waiting list</button>
        </div>
        <div className="hotelInfo" id="hotelInfo" style={{ display: this.state.display }}>
          <div className="introPic" id="introPic" >
            <img src="https://wallpapercave.com/wp/wp38040.jpg" width="800" height="450" />
          </div>
          <div className="hotelDescription" id="hotelDescription" >
            <p>Hotel California is a four-star business cum leisure resort hotel located at the national level tourist scenic spot. The hotel covers an area of 5000 square meters and a building area of 15000 square meters consisting of a main building, auxiliary building and the villa section. There is an esplanade in the villa section where you can have a panoramic view of the sky and sea.</p>
            <p>The hotel has a total of 212 rooms (set) in various standards; the toilet design of the Sea View room is most unique that you can view and listen to the waves while taking a bath, a truly complete relaxation. Every room is equipped with free and unlimited hours of broadband internet access coupled with a computer, digital television that provides clear and a wide variety of TV programmes. The Western restaurant can accommodate 200 diners at the same time, you can savor Brazilian barbecue under the erotic Amazon rain forest setting which mesmerizes you with the tempting aroma and the fabulous after taste....</p>
            <p>There are four conference rooms of different sizes which can cater for participants ranging from more than ten to 400. Every room is well equipped with multimedia overhead projector, slide projector and other facilities to meet the various demands of meetings of different sizes.</p>
            <p>The Linda’s Night Club comprises 38 KTV rooms with elegant décor and the audio system is the U.S. ETC Thunderbolt system equipment; it sets you in a happy mood and lets you sing your heart out. The Sports Center provides healthy and fashionable services like sauna, various kinds of foot care, SPA health club and gymnasium.</p>
          </div>
        </div>
      </div>
    )
  }
}

class DisplayFreeSlots extends React.Component {
  render() {
    return (
      <h2 className="posReminder">
        {"position left: " + this.props.cur}
      </h2>
    )
  }
}

function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.name}</td>
      <td>{issue.phone}</td>
      <td>{issue.time.toLocaleString()}</td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table"  id="myTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

class IssueChange extends React.Component {
  constructor() {
    super();
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }

  handleAddSubmit(e) {
    e.preventDefault();
    const issue = {
      name: document.querySelector(".name").value, 
      phone: document.querySelector(".phone").value
    }
    this.props.createIssue(issue);
    document.querySelector(".name").value = "";
    document.querySelector(".phone").value = "";
  }

  handleDeleteSubmit(e) {
    e.preventDefault();
    const issue = {
      name: document.querySelector(".name").value, 
      phone: document.querySelector(".phone").value
    }
    this.props.deleteIssue(issue);
    document.querySelector(".name").value = "";
    document.querySelector(".phone").value = "";
  }
  render() {
    return (
      <form className = "myForm" name = "myForm">
      <input type="text" className="name" name="name" placeholder="Name"/>
      <input type="text" className="phone" name="phone" placeholder="Phone" />
      <button onClick={this.handleAddSubmit}>Add</button>
      <button onClick = {this.handleDeleteSubmit}>Delete </button>
      </form>
        
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.clearUpIssues = this.clearUpIssues.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id name phone time
      }
    }`;

    const data = await graphQLFetch(query);
 
    if (data) {
      this.setState({ issues: data.issueList });
   
    }
  
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }


  async deleteIssue(issue) {
    const query = `mutation issueDelete($issue: IssueInputs!) {
      issueDelete(issue: $issue) {
        name phone
      }
    }`;
    const data = await graphQLFetch(query, { issue } );
    if (data ){
      this.loadData();
    }
  }
  async clearUpIssues(issue) {
    const query = `mutation issueClearAll($issue: IssueInputs!) {
      issueClearAll(issue: $issue) {
        name phone
      }
    }`;
    const data = await graphQLFetch(query,{issue});
    if (data ){
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        
        <DisplayFreeSlots cur =  {MAXSIZE - this.state.issues.length} />
        <DisplayHomepage clearUpIssues = {this.clearUpIssues}/>
        <IssueChange createIssue={this.createIssue} deleteIssue = {this.deleteIssue}/>
        <br/>
        <IssueTable issues={this.state.issues} />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
