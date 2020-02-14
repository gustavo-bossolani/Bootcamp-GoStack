import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    FaArrowLeft,
    FaArrowRight,
    FaSpinner,
    FaFrownOpen,
    FaCheck,
} from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import {
    Loading,
    Message,
    Owner,
    IssueList,
    Filters,
    Paginator,
    PaginatorButton,
} from './styles';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        filter: 'all',
        page: 1,
        error: '',
    };

    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);
        const { page, filter } = this.state;

        try {
            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: `${filter}`,
                        page,
                    },
                }),
            ]);

            this.setState({
                repository: repository.data,
                issues: issues.data,
                loading: false,
                error: false,
            });
        } catch (err) {
            this.setState({ error: true });
        }
    }

    async componentDidUpdate() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);
        const { page, filter, error } = this.state;

        if (!error) {
            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: `${filter}`,
                        page,
                    },
                }),
            ]);
            this.handleList(repository, issues);
        }
    }

    handleFilter = async event => {
        const { value: selectedValue } = event.target;
        this.setState({ filter: selectedValue });
    };

    handleList = (repository, issues) => {
        this.setState({
            repository: repository.data,
            issues: issues.data,
        });
    };

    handlePaginate = () => {
        const { page: currentPage } = this.state;
        const page = currentPage > 1 ? 1 : 2;
        this.setState({ page });
    };

    render() {
        const { repository, issues, loading, page, error } = this.state;

        if (loading) {
            return (
                <>
                    <Loading loading={loading < 1 ? 1 : 0}>
                        <span>Carregando</span>
                        <FaSpinner size={20} />
                    </Loading>
                    <Message>
                        {error ? (
                            <>
                                <small>
                                    Ocorreu algum erro durante a requisição{' '}
                                </small>
                                <FaFrownOpen size={16} />
                            </>
                        ) : (
                            <>
                                <small>Pronto</small>
                                <FaCheck size={16} />
                            </>
                        )}
                    </Message>
                </>
            );
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <Filters>
                    <span>Buscar Issues por</span>
                    <select onChange={this.handleFilter}>
                        <option value="all">Todas</option>
                        <option value="open">Abertas</option>
                        <option value="closed">Fechadas</option>
                    </select>
                </Filters>
                <IssueList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>
                                        {issue.title}
                                        {issue.labels.map(label => (
                                            <span key={String(label.id)}>
                                                {label.name}
                                            </span>
                                        ))}
                                    </a>
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
                <Paginator>
                    <li>
                        <PaginatorButton
                            onClick={this.handlePaginate}
                            disabled={page < 2 ? 1 : 0}
                        >
                            <FaArrowLeft />
                        </PaginatorButton>
                    </li>
                    <li>
                        <span>{page}</span>
                    </li>
                    <li>
                        <PaginatorButton
                            onClick={this.handlePaginate}
                            disabled={page > 1 ? 1 : 0}
                        >
                            <FaArrowRight />
                        </PaginatorButton>
                    </li>
                </Paginator>
            </Container>
        );
    }
}
