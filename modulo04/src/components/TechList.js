import React, { Component } from 'react';

import image from '../assets/git-gud.gif';
import './TechList.css';

import TechItem from './TechItem';


class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    };

    // Executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if(techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    }

    // Executado sempre que houver alterações nas props ou estado
    componentDidUpdate(_, prevState) {
        // prevProps referencia aos antigos props antes da mudança 
        // prevState referencia aos antigos states antes da mudança 
        // É possível acessar os novos props ou states através do this.porps e this.state
        if(prevState.techs != this.state.techs){
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    }

    // Executado quando o componente deixa de existir
    componentWillUnmount() {
        
    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' });
    }

    handleDelete = tech => {
        this.setState({ techs: this.state.techs.filter(t => t != tech) })
    }

    render() {
        return (
            <>
                <img src={image} alt="git-gud"/>
                <h1>Frases Bacanas de efeito</h1>
                <h2>{this.state.newTech}</h2>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <input 
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.newTech} />
                        <button type="submit">Enviar</button>
                        { this.state.techs.map(tech => 
                            <TechItem  
                                key={tech} 
                                tech={tech} 
                                onDelete={() => this.handleDelete(tech)} />)}
                    </ul>
                </form>
            </>
        )
    }
}

export default TechList;