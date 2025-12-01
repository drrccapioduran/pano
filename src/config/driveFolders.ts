export interface DriveFolder {
  id: string;
  title: string;
  folderId: string;
}

export const driveFolders: Record<string, DriveFolder> = {
  panorama: {
    id: 'panorama',
    title: 'Panorama Gallery',
    folderId: '1nkaUS4tu2UIX9yD1x3T-6NI0DQK6L8-U'
  },
  basemap: {
    id: 'basemap',
    title: 'Base Map Gallery',
    folderId: '1kUGw4LGoyQqpxfQofPWyXRf1546eAibn'
  },
  elevation: {
    id: 'elevation',
    title: 'Elevation Map Gallery',
    folderId: '1C3QRA6HSFOaIR8Rw06bJcdvQlc75pOqv'
  },
  evacuation: {
    id: 'evacuation',
    title: 'Evacuation Gallery',
    folderId: '1hybk0w-QUIxXJuwqV1VrSmW_uErdzMUZ'
  },
  hazards: {
    id: 'hazards',
    title: 'Hazards Gallery',
    folderId: '1ODHvdOCwOtZZXe6ikskULmtsFPlgC6ua'
  },
  purok: {
    id: 'purok',
    title: 'Purok Boundary Maps',
    folderId: '1XLA91HwmfO_mvrQx4t_4C7GbEwMDst-J'
  },
  barangay: {
    id: 'barangay',
    title: 'Barangay Boundary Maps',
    folderId: '1XLA91HwmfO_mvrQx4t_4C7GbEwMDst-J'
  },
  municipal: {
    id: 'municipal',
    title: 'Municipal Boundary Maps',
    folderId: '1XLA91HwmfO_mvrQx4t_4C7GbEwMDst-J'
  },
  interactive: {
    id: 'interactive',
    title: 'Interactive Maps',
    folderId: '1XLA91HwmfO_mvrQx4t_4C7GbEwMDst-J'
  }
};
