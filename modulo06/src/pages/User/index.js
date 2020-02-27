import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import apit from '../../services/api';
// import { Container } from './styles';

export default class User extends Component {
    static propTypes = {
        route: PropTypes.shape({
            params: PropTypes.shape({
                user: PropTypes.shape().isRequired,
            }).isRequired,
        }).isRequired,
    };

    state = {
        stars: [],
    };

    async componentDidMount() {
        const { route } = this.props;
        const { user } = route.params;

        const response = await apit.get(`/users/${user.login}/starred`);

        this.setState({ stars: response.data });
    }

    // static navigationOptions = ({ route }) => ({
    //     title: route.params.name,
    // });

    render() {
        const { stars } = this.state;
        return <View />;
    }
}
