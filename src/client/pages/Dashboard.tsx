import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTickets } from "../redux/ticketSlice";
import jsonParseSafe from "../utils/jsonParseSafe";
import TicketTile from "../components/TicketTile";
import Waiting from "../svg/Waiting";

const DashboardStyled = styled.section`
    padding: 0.5rem;
    @media (min-width: 769px) {
        padding: .5rem 20rem;
    }
`;

const Dashboard: React.FC = () => {
    const { tickets, isSuccess, isError, isLoading } = useAppSelector(state => state.tickets),
        dispatch = useAppDispatch(),
        navigate = useNavigate(),
        { user_name } = jsonParseSafe(localStorage.getItem("user")) || {};

    useEffect(() => {
        if(!user_name || isError) {
            navigate("/login");
            return
        }
        if(tickets.length > 0 || isSuccess) return;
        dispatch(getTickets());
    }, [tickets]);

    return (
        <DashboardStyled>
            {
                !isLoading ? tickets.map(ticket => (
                    <TicketTile key={ticket.id} ticket={ticket} />
                )) :
                <Waiting />
            }
        </DashboardStyled>
    )
}

export default Dashboard;