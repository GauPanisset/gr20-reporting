import { textSpeed } from 'config'
import { WaypointType } from 'enums'
import { Waypoint } from 'types'
import { projectLatLon } from 'utils/projectLatLon'

export const waypoints: Waypoint[] = [
  {
    coordinate: projectLatLon(42.464658, 8.905688),
    id: 0,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.425948, 8.900699),
    id: 1,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.403316, 8.922031),
    id: 2,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.362333, 8.909753),
    id: 3,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.286418, 8.892767),
    id: 4,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.219634, 8.980495),
    id: 5,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.198154, 9.052288),
    id: 6,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.153299, 9.073723),
    id: 7,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.128256, 9.132777),
    id: 8,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.077264, 9.150409),
    id: 9,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.008223, 9.217802),
    id: 10,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(41.934562, 9.205094),
    id: 11,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(41.874019, 9.152542),
    id: 12,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(41.841572, 9.214924),
    id: 13,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(41.79427, 9.259488),
    id: 14,
    type: WaypointType.Refuge,
  },
  {
    coordinate: projectLatLon(42.493905, 8.850094),
    id: 15,
    texts: [],
    image:
      'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/IMG_1094.jpg',
    type: WaypointType.Note,
  },
  {
    coordinate: projectLatLon(42.477807, 8.878112),
    id: 16,
    image:
      'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/IMG_1009.jpg',
    texts: [
      {
        character: {
          avatar:
            'https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91',
          name: 'Gauthier',
        },
        lines: [
          { text: 'Petit passage escalade... ', speed: textSpeed.normal },
          { text: 'Euuuuh... ', speed: textSpeed.slow },
          { text: "C'est dangereux là NON ?!", speed: textSpeed.fast },
        ],
      },
    ],
    type: WaypointType.Note,
  },
]
