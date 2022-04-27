import React, { Component } from 'react';
import Styled from './styles';

import Icon from '/imports/ui/components/common/icon/component';

class Subtitles extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { toggleSubtitle } = this.props;
        return (
            <Styled.SubtitlesWrapper onClick={() => toggleSubtitle()}>
              <Icon iconName='closed_caption' />
            </Styled.SubtitlesWrapper>
        );
    }
}

export default Subtitles;