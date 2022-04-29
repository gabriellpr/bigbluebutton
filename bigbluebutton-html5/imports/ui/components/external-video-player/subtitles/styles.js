import styled from 'styled-components';
import { colorTransparent } from '/imports/ui/stylesheets/styled-components/palette';

const SubtitlesWrapper = styled.div`
  position: absolute;
  z-index: 2;
  border: 0;
  margin: 2px;
  bottom: 0;
  top: 0;
  right: 4%;
  left: auto;
  cursor: pointer;
  opacity: .5;
  
  color: #0F70D7;
  background-color: ${colorTransparent};


  &:hover {
    opacity: 9;
  }

  

`;

export default {
  SubtitlesWrapper,
};