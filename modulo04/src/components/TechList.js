import React, { Component } from 'react';

import image from '../assets/git-gud.gif';
import './TechList.css';

import TechItem from './TechItem';


class TechList extends Component {
    state = {
        newTech: '',
        techs: [
            'Git-Gud',
            'Gud-Git',
            'Git',
            'Gud'
        ]
    };

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
                        { this.state.techs.map(tech => 
                            <TechItem  
                                key={tech} 
                                tech={tech} 
                                onDelete={() => this.handleDelete(tech)} />)}
                    </ul>
                    <input 
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.newTech} />
                    <button type="submit">Enviar</button>
                </form>
            </>
        )
    }
}

export default TechList;