import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: 7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    padding: 30px;
    margin-top: 15px;
    list-style: none;

    span {
        font-weight: bold;
        display: flex;
        justify-content: center;
        margin: 0 0 15px 0;
    }

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;
    }

    & + li {
        margin-top: 10px;
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex: 1;
        margin-left: 15px;
    }

    strong {
        font-size: 16px;

        a {
            text-decoration: none;
            color: #333;

            &:hover {
                color: #7159c1;
            }
        }

        span {
            background: #eee;
            color: #333;
            border-radius: 2px;
            font-size: 12px;
            font-weight: 600;
            height: 20px;
            padding: 3px 4px;
            margin-left: 10px;
            display: inherit;
        }
    }
    p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
    }
`;

export const Filters = styled.div`
    margin-top: 35px;
    padding: 20px;
    border-top: 1px solid #eee;
    text-align: center;

    span {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
    }

    select {
        width: 100%;
        font-size: 14px;
        padding: 10px;
        border: 1px solid #eee;
        -webkit-appearance: none;
        -moz-appearance: none;

        option:hover {
            background: #7159c1;
        }
    }
`;

export const Paginator = styled.ul`
    list-style: none;
    display: flex;
    border-top: 1px solid #eee;
    padding-top: 20px;
    margin-top: 15px;
    justify-content: end;

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
            font-size: 16px;
            color: #7159c1;
        }
    }
`;
export const PaginatorButton = styled.button.attrs(props => ({
    type: 'button',
    disabled: props.disabled,
}))`
    margin: 0 10px;
    background: none;
    color: #7159c1;
    border: 1.5px solid #7159c1;
    padding: 12px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:focus,
    &:hover {
        background: #7159c1;
        color: #eee;
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;
