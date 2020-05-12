import React from 'react';
import './App.css';
import {store} from "./store";

class App extends React.Component {
    private ingredients: string[];
    private ingPrice = 0.75;
    private price = 0;

    constructor(props: any) {
        super(props);
        this.ingredients = ["Salad", "Bacon", "Cheese", "Meat"];
        let state = {} as any
        this.price = 0;
        this.ingredients.forEach((ing) => state[ing] = 0);
        this.state = state as any;
    }

    order = () => {
        store.dispatch({type: 'ORDER_REQUESTED', payload: {...this.state}});
    }
    isAnythingOrdered = (): boolean => {
        let values: number[] = Object.values(this.state);
        return values.some((val) => val > 0);
    }
    isLessDisabledForIng = (ing: string) => {
        let state = {...this.state} as any;
        return !state[ing];
    }
    increaseIng = (ing: string) => {
        let state = {...this.state} as any;
        state[ing]++;
        this.price = this.price + this.ingPrice;
        this.setState(state);
    }
    decreaseIng = (ing: string) => {
        let state = {...this.state} as any;
        state[ing]--;
        this.price = this.price + this.ingPrice;
        this.setState(state);
    }
    renderIngredientsRow = (ingredient: string) => {
        return (<div className="banner" key={ingredient}><span className="ingredient">{ingredient}</span>
            <button className="button" onClick={() => this.decreaseIng(ingredient)}
                    disabled={this.isLessDisabledForIng(ingredient)}>Less
            </button>
            <button className="button" onClick={() => this.increaseIng(ingredient)}>More</button>
        </div>);
    }
    renderStartBanner = () => {
        return !this.isAnythingOrdered() ? (<div className="fancyHamburgerContainer">
                    <div className="fancyHamburger"></div>
                    <div className="banner"> Please start adding ingredients</div>
                    <div className="fancyHamburger"></div>
                </div>
            ) :
            (<div className="fancyHamburgerContainer">
                    <div className="fancyHamburger"></div>
                    {this.renderHamburgerIng()}
                    <div className="fancyHamburger"></div>
                </div>
            );
    }
    renderHamburgerIng = () => {
        let state = {...this.state} as any;
        return this.ingredients.map((ing) => state[ing] ? (
            <div key={"H" + ing} className={"fancyHamburger" + ing}></div>) : "");

    }

    render() {
        return (
            <div className="container">
                {this.renderStartBanner()}
                <div className="orderControlsContainer">
                    <div>Current price: <span className="banner">{this.price}</span></div>
                    {this.ingredients.map((ing) => this.renderIngredientsRow(ing))}
                    <button className="buttonOrder" onClick={this.order} disabled={!this.isAnythingOrdered()}>ORDER
                        NOW
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
