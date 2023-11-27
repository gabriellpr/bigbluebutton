import React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import PresentationMenu from './component';
import FullscreenService from '/imports/ui/components/common/fullscreen-button/service';
import Auth from '/imports/ui/services/auth';
import { layoutSelect, layoutDispatch } from '/imports/ui/components/layout/context';
import { isSnapshotOfCurrentSlideEnabled } from '/imports/ui/services/features';
import { PluginsContext } from '/imports/ui/components/components-data/plugin-context/context';
import { useSubscription } from '@apollo/client';
import {
  CURRENT_PAGE_WRITERS_SUBSCRIPTION,
} from '/imports/ui/components/whiteboard/queries';
import useMeeting from '/imports/ui/core/hooks/useMeeting';

const PresentationMenuContainer = (props) => {
  const fullscreen = layoutSelect((i) => i.fullscreen);
  const { element: currentElement, group: currentGroup } = fullscreen;
  const layoutContextDispatch = layoutDispatch();
  const { elementId } = props;
  const isFullscreen = currentElement === elementId;
  const isRTL = layoutSelect((i) => i.isRTL);
  const { pluginsProvidedAggregatedState } = useContext(PluginsContext);
  let presentationDropdownItems = [];
  if (pluginsProvidedAggregatedState.presentationDropdownItems) {
    presentationDropdownItems = [
      ...pluginsProvidedAggregatedState.presentationDropdownItems,
    ];
  }

  const { data: whiteboardWritersData } = useSubscription(CURRENT_PAGE_WRITERS_SUBSCRIPTION);
  const whiteboardWriters = whiteboardWritersData?.pres_page_writers || [];
  const hasWBAccess = whiteboardWriters?.some((writer) => writer.userId === Auth.userID);

  const meetingInfo = useMeeting((meeting) => ({
    name: meeting?.name,
  }));

  const handleToggleFullscreen = (ref) => FullscreenService.toggleFullScreen(ref);
  const isIphone = !!(navigator.userAgent.match(/iPhone/i));

  return (
    <PresentationMenu
      {...props}
      {...{
        currentElement,
        currentGroup,
        isFullscreen,
        layoutContextDispatch,
        isRTL,
        presentationDropdownItems,
        hasWBAccess,
        meetingName: meetingInfo?.name,
        handleToggleFullscreen,
        isIphone,
        allowSnapshotOfCurrentSlide: isSnapshotOfCurrentSlideEnabled(),
      }}
    />
  );
};

export default PresentationMenuContainer;

PresentationMenuContainer.propTypes = {
  elementId: PropTypes.string.isRequired,
};
