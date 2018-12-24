import { Component } from 'react';
import React from 'react';

export default class TechnicalAnalysisChart extends Component {
	componentDidMount() {
		let script = document.createElement('script');
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
		script.innerHTML = JSON.stringify({
			width: '100%',
			height: '100%',
			symbol: 'HOSE:VIC',
			locale: 'en',
			interval: '1D',
		});
		document.getElementById('technical-analysis-chart').appendChild(script);
	}

	render() {
		return <div id="technical-analysis-chart" />;
	}
}