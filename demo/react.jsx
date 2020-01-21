import React, { useState, useEffect } from 'react';

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        setTimeout(() => {
            this.createIssue(sampleIssue);
        }, 2000);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ issues: initialIssues });
        }, 500);
    }

    createIssue(issue) {
        // Basic incremento spell
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        // Nothing specified so we're just copying the current array
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }
}
