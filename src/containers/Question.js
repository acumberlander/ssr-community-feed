import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Card from '../components/Card/Card';

const QuestionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin: 5%;
`;

const Alert = styled.div`
	text-align: center;
`;

const ROOT_API = 'https://api.stackexchange.com/2.2/';

class Question extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			loading: true,
			error: '',
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		try {
			const data = await fetch(
				`${ROOT_API}questions/${match.params.id}?site=stackoverflow`
			);
			const dataJSON = await data.json();

			if (dataJSON) {
				this.setState({
					data: dataJSON,
					loading: false,
				});
			}
		} catch (error) {
			this.setState({
				loading: true,
				error: error.message,
			});
		}
	}

	render() {
		const { match } = this.props;
		const { data, loading, error } = this.state;

		if (loading || error) {
			return (
				<>
					<Helmet>
						<title>{`Q&A Feed - Questions ${match.params.id}`}</title>
					</Helmet>
					<Alert>{loading ? 'Loading...' : error}</Alert>;
				</>
			);
		}

		return (
			<div>
				<QuestionWrapper>
					<Card key={data.items[0].question_id} data={data.items[0]} />
				</QuestionWrapper>
			</div>
		);
	}
}

export default Question;
