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
              <button>
                <Icon iconName='closed_caption' />
              </button>
            </Styled.SubtitlesWrapper>
        );
    }
}

export default Subtitles;