import styled from "styled-components";


export const Title = styled.h1`

    font-size: 2rem;
    margin-bottom: 1rem;

`
export const Container = styled.div`

    max-width: 1200px;
    margin: 0 auto;
    border: 2px solid black;
`


export const SearchBox = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
`

export const Input = styled.input`
    padding: 0.5rem;
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const Button = styled.div`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`
export const Grid= styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`