import React from 'react';
import { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { injectIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import JoinVideoButton from './component';
import VideoService from '../service';
import {
  updateSettings,
} from '/imports/ui/components/settings/service';
import { PluginsContext } from '/imports/ui/components/components-data/plugin-context/context';
import { CAMERA_BROADCAST_STOP } from '../mutations';

const JoinVideoOptionsContainer = (props) => {
  const {
    updateSettings,
    hasVideoStream,
    disableReason,
    status,
    intl,
    ...restProps
  } = props;

  const [cameraBroadcastStop] = useMutation(CAMERA_BROADCAST_STOP);

  const sendUserUnshareWebcam = (cameraId) => {
    cameraBroadcastStop({ variables: { cameraId } });
  };

  const {
    pluginsExtensibleAreasAggregatedState,
  } = useContext(PluginsContext);
  let cameraSettingsDropdownItems = [];
  if (pluginsExtensibleAreasAggregatedState.cameraSettingsDropdownItems) {
    cameraSettingsDropdownItems = [
      ...pluginsExtensibleAreasAggregatedState.cameraSettingsDropdownItems,
    ];
  }
  return (
    <JoinVideoButton {...{
      cameraSettingsDropdownItems,
      hasVideoStream,
      updateSettings,
      disableReason,
      status,
      sendUserUnshareWebcam,
      ...restProps,
    }}
    />
  );
};

export default injectIntl(withTracker(() => ({
  hasVideoStream: VideoService.hasVideoStream(),
  updateSettings,
  disableReason: VideoService.disableReason(),
  status: VideoService.getStatus(),
}))(JoinVideoOptionsContainer));
