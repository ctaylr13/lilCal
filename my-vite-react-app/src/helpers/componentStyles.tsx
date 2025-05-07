import styled from "styled-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export const InputRowStyled = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const FeedbackStyled = styled.div`
    color: red;
`;

export const DateRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const Box = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
`;

export const TopBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; /* or desired height */
    background-color: #333;
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
`;

export const SideNav = styled.div`
    position: fixed;
    top: 60px; /* same height as TopBar */
    left: 0;
    height: calc(100vh - 60px);
    width: 350px; /* or desired width */
    background-color: #444;
    padding-top: 10px;
    box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
    margin-top: 60px; /* height of TopBar */
    margin-left: 200px; /* width of SideNav */
    height: calc(100vh - 60px);
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
    width: calc(100% - 200px);
`;
interface CustomButtonProps {
    disabled?: boolean;
    focused?: boolean;
}

export const WideOvalButton = styled.button<CustomButtonProps>`
    padding: 12px 40px; /* wide oval shape */
    border-radius: 999px; /* pill shape */
    border: 2px solid #228b22;
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#e0e0e0")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    outline: none;
    transition: all 0.3s ease;
    font-size: 1em;
    &:hover {
        background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#999")};
    }
`;

//Timeline styles
export const AllDayEventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const LeftArrow = styled(ChevronLeftIcon)`
    cursor: pointer;
    &:hover {
        color: blue;
    }
    height: 20px;
    width: 20px;
`;

export const RightArrow = styled(ChevronRightIcon)`
    cursor: pointer;
    &:hover {
        color: blue;
    }
    height: 20px;
    width: 20px;
`;

export const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 200px;
`;

export const Header = styled.h2`
    text-align: center;
`;

export const TimelineWrapper = styled.div`
    display: flex;
    position: relative;
    height: ${24 * 60}px; /* 1440px */
`;

export const HoursColumn = styled.div`
    width: 60px; /* or whatever width you prefer */
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
`;

export const EventsContainer = styled.div`
    flex: 1;
    position: relative; /* for overlaying event spans */
    height: ${24 * 60}px; /* total height for all hours (1440px) */
    box-sizing: border-box;
    /* optionally, add border or background for clarity */
`;

export const HourRow = styled.div`
    height: 60px; /* height of each hour block */
    border-top: 1px solid #ccc;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box; /* ensure borders/padding don't increase size */
    position: absolute; /* position in container for grid lines */
`;

export const HourLabel = styled.div`
    padding: 2px 4px;
    font-size: 0.8em;
`;
