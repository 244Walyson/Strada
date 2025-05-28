import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
<<<<<<< HEAD
  ActivityIndicator,
  Alert,
=======
>>>>>>> 7882329 (funcional 1)
} from "react-native";
import * as Location from "expo-location";
import Mapbox from "@rnmapbox/maps";
import { FontAwesome } from "@expo/vector-icons";
import { lightTheme, Theme } from "@/src/constants/theme";
import { AppImages } from "@/src/assets";
import BottomSheet, {
  BottomSheetHandle,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
<<<<<<< HEAD
=======
import polyline from "@mapbox/polyline";
>>>>>>> 7882329 (funcional 1)
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/src/constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
<<<<<<< HEAD
import { getRideById } from "@/src/services/ride.service";
=======
>>>>>>> 7882329 (funcional 1)

Mapbox.setAccessToken(
  "pk.eyJ1Ijoid2FseXNvbjAyMDQiLCJhIjoiY203dHFqNW83MHRzZTJrcGx3ZTBueDhidiJ9.pXJ1E9vxbZUelyIAh-YV5g"
);

<<<<<<< HEAD
// --- Updated Interface for Ride Data ---
interface PassengerRequest {
  id: string;
  rideId: string;
  passengerId: string; // This would typically link to a User/Passenger object
  seatsNeeded: number;
  message: string;
  status: string;
  requestedPickupAddress: string;
  requestedDropoffAddress: string;
  createdAt: string;
  updatedAt: string;
  respondedAt: string | null;
  pickupDistance: number | null;
  dropoffDistance: number | null;
  additionalDistance: number | null;
  detourPercentage: number | null;
  pickedUpAt: string | null;
  droppedOffAt: string | null;
  // Assuming you might fetch passenger details separately or embed them
  passengerDetails?: {
    id: string;
    name: string;
    imgUrl?: string; // Add imgUrl if available in user details
    rating?: number; // Add rating if available in user details
  };
}

interface Point {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

interface LineString {
  type: "LineString";
  coordinates: number[][]; // [[lng, lat], [lng, lat], ...]
}

interface RideData {
  id: string;
  driverId: string;
  startAddress: string;
  endAddress: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  status: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  allowLuggage: boolean;
  estimatedDuration: number; // in seconds
  estimatedDistance: number; // in meters
  actualDuration: number | null;
  actualDistance: number | null;
  actualStartTime: string | null;
  actualEndTime: string | null;
  createdAt: string;
  updatedAt: string;
  currentLatitude: number | null;
  currentLongitude: number | null;
  lastLocationUpdate: string | null;
  routePoints: any[]; // Assuming this might be an empty array or not used for drawing polyline
  requests: PassengerRequest[];
  startPoint: Point;
  endPoint: Point;
  plannedRoute: LineString; // This is the actual polyline data
  // Assuming you might fetch driver details separately or embed them
  driverDetails?: {
    id: string;
    name: string;
    imgUrl?: string; // Add imgUrl if available
    rating?: number; // Add rating if available
  };
}
// --- End Updated Interface for Ride Data ---

// --- User Data Interface (for driver/passenger details) ---
interface UserData {
  id: string;
  name: string;
  email: string;
  imgUrl: string | null;
  username: string;
  createdAt: string;
  isActive: boolean;
  cpf: string | null;
  rg: string | null;
  birthDate: string | null;
  phone: string | null;
  address: string | null;
  cep: string | null;
  city: string | null;
  state: string | null;
  userType: "ADULT" | "MINOR";
  guardians: any[];
  minors: any[];
}
// --- End User Data Interface ---
=======
// Interface for ride data
interface RideData {
  id: number;
  driverName: string;
  driverImage: string;
  carModel: string;
  carColor?: string;
  licensePlate?: string;
  seatsAvailable: number;
  dist?: number;
  reviews?: number;
  rating: number;
  pricePerSeat: number;
  totalFare?: number;
  departureLocation: string;
  departureTime: string;
  duration: string;
  availableSeats: number;
  destination: string;
  isFavorite?: boolean;
  paymentMethod?: string;
  pickup?: {
    address: string;
    coordinates: [number, number];
  };
  dropoff?: {
    address: string;
    coordinates: [number, number];
  };
  passengers?: {
    id: number;
    name: string;
    imgUrl: string;
    rating: number;
    pickup?: {
      address: string;
      coordinates: [number, number];
    };
  }[];
  feedback?: string;
}

const sampleRideData: RideData = {
  id: 1,
  driverName: "Budi Susanto",
  driverImage:
    "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  carModel: "Toyota Avanza",
  carColor: "Black",
  licensePlate: "B 1233 YH",
  seatsAvailable: 3,
  rating: 4.8,
  pricePerSeat: 14.0,
  totalFare: 4.0,
  departureLocation: "456 Elm Street, Springfield",
  departureTime: "14:30",
  duration: "30 Minutes",
  availableSeats: 2,
  destination: "Office - 739 Main Street, Springfield",
  paymentMethod: "e-Wallet",
  pickup: {
    address: "456 Elm Street, Springfield",
    coordinates: [-44.339732, -20.073888],
  },
  dropoff: {
    address: "Office - 739 Main Street, Springfield",
    coordinates: [-44.20075, -19.95512],
  },
  passengers: [
    {
      id: 1,
      name: "John Doe",
      imgUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
      rating: 4.5,
      pickup: {
        address: "123 Main Street, Springfield",
        coordinates: [-44.321519, -20.074622],
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      imgUrl: "https://avatars.githubusercontent.com/u/124599?v=4",
      rating: 4.0,
      pickup: {
        address: "789 Oak Avenue, Springfield",
        coordinates: [-44.264464, -20.04228],
      },
    },
  ],
  feedback: "Driver was friendly, and the ride was smooth.",
};
>>>>>>> 7882329 (funcional 1)

const PassengerMarker = ({ passenger, onLoad }) => {
  const theme = lightTheme;
  const styles = getStyles(theme);
<<<<<<< HEAD
  // Fallback image if imgUrl is null
  const passengerImageSource = passenger.imgUrl
    ? { uri: passenger.imgUrl }
    : AppImages.userPlaceholder; // Ensure you have a placeholder image in AppImages
  return (
    <View>
      <Image
        source={passengerImageSource}
=======
  return (
    <View>
      <Image
        source={{ uri: passenger.imgUrl }}
>>>>>>> 7882329 (funcional 1)
        style={[styles.passengerImageContainer, styles.passengerImage]}
        onLoad={onLoad}
      />
    </View>
  );
};

const RideShareMap = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
<<<<<<< HEAD
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [driverData, setDriverData] = useState<UserData | null>(null); // State for driver details
  const [passengerDetailsMap, setPassengerDetailsMap] = useState<
    Map<string, UserData>
  >(new Map()); // Map to store passenger details by ID
=======
  const [rideData, setRideData] = useState<RideData>(sampleRideData);
>>>>>>> 7882329 (funcional 1)
  const [isTripActive, setIsTripActive] = useState(true);
  const [routeCoords, setRouteCoords] = useState<number[][]>([]);
  const markerRef = useRef<Mapbox.PointAnnotation>(null);
  const [isSearching, setIsSearching] = useState(true);
  const pointAnnotationRefs = useRef<
    Record<string, Mapbox.PointAnnotation | null>
  >({});
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);

  const bottomSheetRef = useRef(null);
  const snapPoints = ["3%", "12%", "60%", "75%"];
  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);
=======

  const bottomSheetRef = useRef(null);

  const snapPoints = ["3%", "12%", "60%", "75%"];

  const [currentSnapIndex, setCurrentSnapIndex] = useState(1);

>>>>>>> 7882329 (funcional 1)
  const mapRef = useRef<Mapbox.MapView>(null);
  const theme = lightTheme;
  const styles = getStyles(theme);

<<<<<<< HEAD
  // Helper to format duration from seconds to minutes
  const formatDuration = (seconds: number) => {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} Minutes`;
  };

  // Helper to format distance from meters to kilometers
  const formatDistance = (meters: number) => {
    const kilometers = (meters / 1000).toFixed(1);
    return `${kilometers} km`;
  };

  // --- API Fetching Functions ---

  // Function to fetch user details (for driver and passengers)
  const fetchUserDetails = async (userId: string): Promise<UserData | null> => {
    try {
      const response = await fetch(
        `https://your-api.com/api/users/${userId}` // Replace with your user endpoint
      );
      if (!response.ok) {
        console.error(`Error fetching user ${userId}:`, response.statusText);
        return null;
      }
      const data: UserData = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch user ${userId} details:`, error);
      return null;
    }
  };

  // Main function to fetch ride details and related data
  const fetchAllRideData = async (rideId: string) => {
    setIsLoading(true);
    try {
      // 1. Fetch Ride Details
      const rideResponse = await getRideById(rideId);
      setRideData(rideResponse);

      // 2. Fetch Driver Details
      const driver = await fetchUserDetails(rideResponse.driverId);
      if (driver) {
        setDriverData(driver);
      }

      // 3. Fetch Passenger Details for each request
      const passengerDetailsPromises = rideResponse.requests.map(
        async (request) => {
          const passenger = await fetchUserDetails(request.passengerId);
          if (passenger) {
            return { requestId: request.id, details: passenger };
          }
          return null;
        }
      );

      const resolvedPassengerDetails = (
        await Promise.all(passengerDetailsPromises)
      ).filter(Boolean); // Filter out nulls

      const newPassengerDetailsMap = new Map<string, UserData>();
      resolvedPassengerDetails.forEach((item) => {
        if (item) {
          newPassengerDetailsMap.set(item.requestId, item.details);
        }
      });
      setPassengerDetailsMap(newPassengerDetailsMap);

      // 4. Decode Route Polyline
      if (
        rideResponse.plannedRoute &&
        rideResponse.plannedRoute.coordinates.length > 0
      ) {
        // Your API already returns a LineString. We just need to ensure coordinates are [lng, lat]
        // The API provides coordinates as [lng, lat] already, so no need for polyline.decode
        // If your API returns an ENCODED polyline string, you would use:
        // const decodedPolyline = polyline.decode(rideDataFetched.routePolylineEncoded);
        // const formattedRoute = decodedPolyline.map(([lat, lng]) => [lng, lat]);
        // For your current format, it's direct:
        setRouteCoords(rideResponse.plannedRoute.coordinates);
      }
    } catch (error) {
      console.error("Failed to fetch ride details:", error);
      setErrorMsg("Failed to load ride details. Please try again.");
      Alert.alert("Error", "Failed to load ride details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    // Use a real ride ID from your system, e.g., from navigation params
    const exampleRideId = "cmbn4mbku000424zdh8s3eegl"; // Replace with a dynamic ride ID
    fetchAllRideData(exampleRideId);
  }, []);

  // --- Location Permission (Existing) ---
=======
  useEffect(() => {
    const encodedPolyline =
      "xtoyBfbsmG|BRP{CnAMtFuAvBs@xBo@~B_@qC{LeBmIwBoJoA{E[BwAcLYmCUcBc@yA[eDOgAG_Ad@G~A]c@eCn@uFBw@}BiK`HgB`Ce@dD}@jDwA~ImEbCuAbAo@zDoB`@ShCc@nDiA|A]`KuAvCQdBCz@IrCq@|@UxXeAl@STSJYTuB]MsCi@eE_A[AuM_EeBw@aBeAwy@uk@oFiE}]iVoTaO{[yTgI}FkE{C}CaCsBkByB}BkAsAk\\cc@yKsNmBuBkGeGiAuAa@o@]w@Uu@_@cBg@uCeAgDm@mA}@sAgAiAsAcAeB}@cG}BqAo@s@k@q@u@s@kA_@cAoCyJaAiEm@{BO}@_D}LwNuk@m@oCy@{CsD_Oc@iCSkBOgCO{DUiDSwBaAeH_AyEw@aDcAiD_CkGiAiCgEuIkFcKeNyXyAaC}@kAu@y@kEcDwAsA}AgByGkIw@y@{CiCmEuCgEeCk@YmAe@mCs@gO_EcAc@_@Qy@m@s@w@s@iAq@gByFoRm@_Bo@cAm@m@cAo@qPwIwAw@eBkA_XaUuF_FiL{J{@u@{AaAeCiAaKgDmHcCmDyAmA{@yCkCoCcByImEaDgAsOkEmBs@kAi@yBqAUC_CyAkFkCkLcGqCkAqDoAyVeI_KeD_B]iEi@_AMeAUw@[]Qs@m@m@{@e@iAK[SaBWoE[{Ia@yGe@cLg@eKHe@LUPKXGZFNJN^B^E`@KZUXe@XeAPoEVcBXiFxBm@Xy@ViAP_ADcAAkA@oCEw@BsAP}D|@oANaAByDA}@JiAb@eDzBiDrBcBp@sBTcBFeEK}AJ}JpG_Bv@}Br@}FbAqAJqN}DwFcBSBMLGPBT@BpHrB_@|BCJBDBfANrAtB|HZnAh@fCIN@PLLJ?UzAMn@bB@RB";
    const decodedPolyline = polyline.decode(encodedPolyline);

    // Converte de [lat, lng] para [lng, lat]
    const formattedRoute = decodedPolyline.map(([lat, lng]) => [lng, lat]);

    console.log("Formatted Route:", formattedRoute);

    setRouteCoords(formattedRoute);
  }, []);

>>>>>>> 7882329 (funcional 1)
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
<<<<<<< HEAD
=======

>>>>>>> 7882329 (funcional 1)
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setHasLocationPermission(true);
    }
<<<<<<< HEAD
    getCurrentLocation();
  }, []);
  // --- End Location Permission ---

  const handleSheetChanges = useCallback((index) => {
    setCurrentSnapIndex(index);
=======

    getCurrentLocation();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    setCurrentSnapIndex(index);
    if (mapRef.current) {
      const bounds = calculateBoundingBox();
    }
>>>>>>> 7882329 (funcional 1)
  }, []);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          currentSnapIndex === 0 || isSearching ? -200 : 0,
          {
            duration: 300,
          }
        ),
      },
    ],
  }));

<<<<<<< HEAD
  // Function to calculate map bounds, including all points
  const calculateBoundingBox = () => {
    if (!rideData) return undefined;

    const coordinates = [
      rideData.startPoint.coordinates, // Driver's start point
      rideData.endPoint.coordinates, // Driver's end point
      ...(rideData.requests
        .map((req) => {
          // Assuming requestedPickupAddress might also have coordinates in a real app
          // For now, if your API doesn't provide coords for passenger pickup/dropoff,
          // you'd need to geocode these addresses or fetch them.
          // For this example, I'll use a placeholder or assume start/end points are enough for bounds
          // If you need specific passenger pickup coords, you'll need them in the PassengerRequest interface
          return null; // Placeholder: If your API provides coords for requestedPickupAddress, use them here
        })
        .filter(Boolean) as [number, number][]),
    ].filter(Boolean); // Filter out any nulls

    // Add all planned route coordinates to the bounding box calculation
    if (routeCoords.length > 0) {
      routeCoords.forEach((coord) =>
        coordinates.push(coord as [number, number])
      );
    }

    if (coordinates.length >= 2) {
      const padding = 0.01;
      const lngs = coordinates.map((coord) => coord[0]);
      const lats = coordinates.map((coord) => coord[1]);
=======
  // Função para calcular os limites do mapa, incluindo todos os passageiros
  const calculateBoundingBox = () => {
    const coordinates = [
      rideData.pickup?.coordinates,
      rideData.dropoff?.coordinates,
      ...(rideData.passengers?.map((p) => p.pickup?.coordinates) || []),
    ].filter(Boolean);

    if (coordinates.length >= 2) {
      const padding = 0.01;
      const lngs = coordinates.map((coord) => coord![0]);
      const lats = coordinates.map((coord) => coord![1]);
>>>>>>> 7882329 (funcional 1)

      return {
        ne: [Math.max(...lngs) + padding, Math.max(...lats) + padding],
        sw: [Math.min(...lngs) - padding, Math.min(...lats) - padding],
      };
    }
    return undefined;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={`star-${i}`} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesome
          key="half-star"
          name="star-half-o"
          size={16}
          color="#FFD700"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-star-${i}`}
          name="star-o"
          size={16}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

<<<<<<< HEAD
  // --- Loading and Error UI ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryPink} />
        <Text style={styles.loadingText}>Loading ride details...</Text>
      </View>
    );
  }

  if (errorMsg || !rideData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {errorMsg || "No ride data available."}
        </Text>
        <TouchableOpacity
          onPress={() => fetchAllRideData("cmbn4mbku000424zdh8s3eegl")} // Retry with a fixed ID
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // --- End Loading and Error UI ---

  // Fallback for driver image if not available
  const driverImage = driverData?.imgUrl || AppImages.github;
  const driverName = driverData?.name || "Unknown Driver";
  const driverRating = driverData?.rating ?? 0; // Assuming rating might come from user data

=======
>>>>>>> 7882329 (funcional 1)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.page}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        {/* Map View */}
        <View style={styles.mapContainer}>
          <Mapbox.MapView
            ref={mapRef}
            style={styles.map}
            styleURL="mapbox://styles/mapbox/light-v11"
            logoEnabled={false}
            attributionEnabled={false}
          >
            <Mapbox.Camera
              bounds={calculateBoundingBox()}
              padding={{
                paddingTop:
                  currentSnapIndex === 0
                    ? 60
                    : currentSnapIndex === 1
                    ? Dimensions.get("window").height * 0.2
                    : 220,
                paddingBottom:
                  currentSnapIndex === 0
                    ? 100
                    : currentSnapIndex === 1
                    ? Dimensions.get("window").height * 0.2
                    : Dimensions.get("window").height * 0.6,
                paddingLeft: 50,
                paddingRight: 50,
              }}
              animationMode="flyTo"
              animationDuration={1500}
            />

<<<<<<< HEAD
            {routeCoords.length > 0 && (
=======
            {rideData.pickup && rideData.dropoff && routeCoords.length > 0 && (
>>>>>>> 7882329 (funcional 1)
              <Mapbox.ShapeSource
                id="routeSource"
                shape={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: routeCoords,
                  },
                }}
              >
                <Mapbox.LineLayer
                  id="routeLine"
                  style={{
                    lineWidth: 6,
                    lineColor: "#000",
                    lineCap: "round",
                    lineJoin: "round",
                  }}
                />
              </Mapbox.ShapeSource>
            )}

<<<<<<< HEAD
            {/* Main Pickup Point (Driver's Start Point) */}
            <Mapbox.PointAnnotation
              id="startLocation"
              key={`start-${rideData.id}`}
              coordinate={rideData.startPoint.coordinates}
              title="Start Point"
              ref={(ref) => {
                if (rideData.startPoint.coordinates) {
                  pointAnnotationRefs.current["startLocation"] = ref;
=======
            {/* Ponto de partida principal */}
            <Mapbox.PointAnnotation
              id="pickupLocation"
              key={`pickup-${rideData.id}`}
              coordinate={rideData.pickup?.coordinates!}
              title="Main Pickup"
              ref={(ref) => {
                if (rideData.dropoff?.coordinates) {
                  pointAnnotationRefs.current["pickupLocation"] = ref;
>>>>>>> 7882329 (funcional 1)
                }
              }}
            >
              <View style={styles.mainPickupMarker}>
                <Image
                  source={AppImages.circularpin}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  onLoad={() => {
<<<<<<< HEAD
                    pointAnnotationRefs?.current?.["startLocation"]?.refresh();
=======
                    pointAnnotationRefs?.current?.["pickupLocation"]?.refresh();
>>>>>>> 7882329 (funcional 1)
                  }}
                />
              </View>
            </Mapbox.PointAnnotation>

<<<<<<< HEAD
            {/* Main Dropoff Point (Driver's End Point) */}
            <Mapbox.PointAnnotation
              id="endLocation"
              key={`end-${rideData.id}`}
              coordinate={rideData.endPoint.coordinates}
              title="End Point"
              ref={(ref) => {
                if (rideData.endPoint.coordinates) {
                  pointAnnotationRefs.current["endLocation"] = ref;
=======
            <Mapbox.PointAnnotation
              id="dropoffLocation"
              key={`dropoff-${rideData.id}`}
              coordinate={rideData.dropoff?.coordinates!}
              title="Dropoff"
              ref={(ref) => {
                if (rideData.dropoff?.coordinates) {
                  pointAnnotationRefs.current["dropoffLocation"] = ref;
>>>>>>> 7882329 (funcional 1)
                }
              }}
            >
              <View style={styles.dropoffMarker}>
                <Image
                  source={AppImages.dropoffpin}
                  style={styles.dropoffMarkerPin}
                  onLoad={() => {
<<<<<<< HEAD
                    pointAnnotationRefs?.current?.["endLocation"]?.refresh();
=======
                    pointAnnotationRefs?.current?.[
                      "dropoffLocation"
                    ]?.refresh();
>>>>>>> 7882329 (funcional 1)
                  }}
                />
              </View>
            </Mapbox.PointAnnotation>

<<<<<<< HEAD
            {/* Passenger Request Pickup Markers */}
            {rideData.requests?.map((request) => {
              // You'll need to fetch/store coordinates for requestedPickupAddress if not in the API response directly
              // For demonstration, I'm using a placeholder coordinate or you'd need to geocode `request.requestedPickupAddress`
              const passengerDetails = passengerDetailsMap.get(request.id);
              const passengerPickupCoords: [number, number] | undefined =
                undefined; // Placeholder
              // if (passengerDetails && passengerDetails.pickupCoords) {
              //   passengerPickupCoords = passengerDetails.pickupCoords;
              // }

              // For now, I'll use startPoint as a placeholder if no specific passenger pickup coords are available.
              // In a real app, you would have specific coordinates for each passenger pickup.
              const markerCoordinate =
                passengerPickupCoords || rideData.startPoint.coordinates;

              return (
                passengerDetails && (
                  <Mapbox.PointAnnotation
                    key={`passenger-${request.id}`}
                    id={`passenger-${request.id}`}
                    coordinate={markerCoordinate}
                    title={passengerDetails.name}
                    ref={(ref) => {
                      pointAnnotationRefs.current[`passenger-${request.id}`] =
                        ref;
                    }}
                  >
                    <PassengerMarker
                      passenger={{
                        imgUrl: passengerDetails.imgUrl,
                        name: passengerDetails.name,
                      }} // Pass relevant passenger data
                      onLoad={() => {
                        pointAnnotationRefs.current[
                          `passenger-${request.id}`
=======
            {/* Marcadores dos passageiros */}
            {rideData.passengers?.map(
              (passenger) =>
                passenger.pickup?.coordinates && (
                  <Mapbox.PointAnnotation
                    key={`passenger-${passenger.id}`}
                    id={`passenger-${passenger.id}`}
                    coordinate={passenger.pickup.coordinates}
                    title={passenger.name}
                    ref={(ref) => {
                      if (passenger.pickup?.coordinates) {
                        pointAnnotationRefs.current[
                          `passenger-${passenger.id}`
                        ] = ref;
                      }
                    }}
                  >
                    <PassengerMarker
                      passenger={passenger}
                      onLoad={() => {
                        pointAnnotationRefs.current[
                          `passenger-${passenger.id}`
>>>>>>> 7882329 (funcional 1)
                        ]?.refresh();
                      }}
                    />
                  </Mapbox.PointAnnotation>
                )
<<<<<<< HEAD
              );
            })}
=======
            )}
>>>>>>> 7882329 (funcional 1)
          </Mapbox.MapView>
        </View>

        {/* Location Info Panel */}
        <Animated.View style={[styles.locationPanel, animatedHeaderStyle]}>
          {isSearching ? (
            <View style={styles.searchContainer}>
              <TouchableOpacity style={styles.searchBar} onPress={() => {}}>
                <Icon name="search" size={22} color={colors.darkGrey} />
                <TextInput
                  style={styles.searchPlaceholder}
                  placeholder="Para onde você vai?"
                ></TextInput>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton} onPress={() => {}}>
                <Icon name="map" size={22} color={colors.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.locationCard}>
              {/* Pickup Point */}
              <View
                style={[
                  styles.locationItem,
                  { display: currentSnapIndex === 1 ? "none" : "flex" },
                ]}
              >
                <View style={styles.locationIconContainer}>
                  <View
                    style={[styles.locationDot, { backgroundColor: "#4A89F3" }]}
                  />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationLabel}>Pickup point</Text>
                  <Text style={styles.locationAddress}>
<<<<<<< HEAD
                    {rideData.startAddress}
=======
                    {rideData.pickup?.address}
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>

              {/* Destination */}
              <View style={styles.locationItem}>
                <View style={styles.locationIconContainer}>
                  <View
                    style={[styles.locationDot, { backgroundColor: "#333" }]}
                  />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationLabel}>Where to go?</Text>
                  <Text style={styles.locationAddress}>
<<<<<<< HEAD
                    {rideData.endAddress}
=======
                    {rideData.dropoff?.address}
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Bottom Sheet para informações da viagem */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={(props) => (
            <BottomSheetHandle {...props} style={styles.bottomSheetHandle}>
              <View style={styles.handleBar} />
            </BottomSheetHandle>
          )}
        >
          <BottomSheetView style={styles.rideInfoCard}>
            <View style={styles.driverInfoContainer}>
              <View style={styles.driverInfo}>
                <Image
<<<<<<< HEAD
                  source={{ uri: driverImage }}
                  style={styles.driverImage}
                />
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>{driverName}</Text>
=======
                  source={{ uri: rideData.driverImage }}
                  style={styles.driverImage}
                />
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>{rideData.driverName}</Text>
>>>>>>> 7882329 (funcional 1)
                  <Text style={styles.driverRole}>Driver</Text>
                </View>
              </View>
              <View style={styles.carInfo}>
                <Text style={styles.carModel}>
<<<<<<< HEAD
                  {rideData.vehicleModel}, {rideData.vehicleColor}
=======
                  {rideData.carModel}, {rideData.carColor}
>>>>>>> 7882329 (funcional 1)
                </Text>
                <Text style={styles.licensePlate}>{rideData.licensePlate}</Text>
              </View>
            </View>

            {/* Rating, Payment, Duration */}
            <View style={styles.tripDetails}>
              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Rating</Text>
                <View style={styles.ratingContainer}>
<<<<<<< HEAD
                  {renderStars(driverRating)}
=======
                  {renderStars(rideData.rating)}
>>>>>>> 7882329 (funcional 1)
                </View>
              </View>

              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Payment Method</Text>
                <Text style={styles.tripDetailValue}>
<<<<<<< HEAD
                  {"Not specified"}{" "}
                  {/* Your API does not return paymentMethod directly in ride data */}
=======
                  {rideData.paymentMethod}
>>>>>>> 7882329 (funcional 1)
                </Text>
              </View>

              <View style={styles.tripDetailItem}>
                <Text style={styles.tripDetailLabel}>Travel Duration</Text>
<<<<<<< HEAD
                <Text style={styles.tripDetailValue}>
                  {formatDuration(rideData.estimatedDuration)}
                </Text>
              </View>
            </View>

            {/* Passengers Section (from requests) */}
            {rideData.requests && rideData.requests.length > 0 && (
              <View style={styles.passengersSection}>
                <Text style={styles.passengersLabel}>Passengers</Text>
                <View style={styles.passengersContainer}>
                  {rideData.requests.map((request) => {
                    const passengerDetails = passengerDetailsMap.get(
                      request.id
                    );
                    return passengerDetails ? (
                      <View key={request.id} style={styles.passengerItem}>
                        <Image
                          source={{
                            uri:
                              passengerDetails.imgUrl ||
                              AppImages.userPlaceholder,
                          }}
                          style={styles.passengerThumbnail}
                        />
                        <Text style={styles.passengerItemName}>
                          {passengerDetails.name}
                        </Text>
                        <View style={styles.passengerRating}>
                          <FontAwesome name="star" size={12} color="#FFD700" />
                          <Text style={styles.passengerRatingText}>
                            {(passengerDetails.rating || 0).toFixed(1)}
                          </Text>
                        </View>
                      </View>
                    ) : null;
                  })}
=======
                <Text style={styles.tripDetailValue}>{rideData.duration}</Text>
              </View>
            </View>

            {/* Passengers Section */}
            {rideData.passengers && rideData.passengers.length > 0 && (
              <View style={styles.passengersSection}>
                <Text style={styles.passengersLabel}>Passengers</Text>
                <View style={styles.passengersContainer}>
                  {rideData.passengers.map((passenger) => (
                    <View key={passenger.id} style={styles.passengerItem}>
                      <Image
                        source={{ uri: passenger.imgUrl }}
                        style={styles.passengerThumbnail}
                      />
                      <Text style={styles.passengerItemName}>
                        {passenger.name}
                      </Text>
                      <View style={styles.passengerRating}>
                        <FontAwesome name="star" size={12} color="#FFD700" />
                        <Text style={styles.passengerRatingText}>
                          {passenger.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  ))}
>>>>>>> 7882329 (funcional 1)
                </View>
              </View>
            )}

            {/* Fare Details */}
            <View style={styles.fareDetails}>
              <View style={styles.fareItem}>
<<<<<<< HEAD
                <Text style={styles.fareLabel}>Ride Fare (Per Seat)</Text>
=======
                <Text style={styles.fareLabel}>Ride Fare</Text>
>>>>>>> 7882329 (funcional 1)
                <Text style={styles.fareAmount}>
                  ${rideData.pricePerSeat.toFixed(2)}
                </Text>
              </View>

              <View style={styles.fareItem}>
<<<<<<< HEAD
                <Text style={styles.fareLabel}>Estimated Distance</Text>
                <Text style={styles.fareAmount}>
                  {formatDistance(rideData.estimatedDistance)}
                </Text>
              </View>

              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>Available Seats</Text>
                <Text style={styles.totalFare}>{rideData.availableSeats}</Text>
              </View>
            </View>

            {/* Feedback (Not directly in your RideData, using a placeholder) */}
            {/* You would need to add a feedback field to your API's RideData if you want this dynamic */}
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackLabel}>Feedback</Text>
              <Text style={styles.feedbackText}>
                {"No feedback available for this ride yet."}
              </Text>
            </View>
=======
                <Text style={styles.fareLabel}>Discount</Text>
                <Text style={styles.fareAmount}>--</Text>
              </View>

              <View style={styles.fareItem}>
                <Text style={styles.fareLabel}>Total fare</Text>
                <Text style={styles.totalFare}>
                  ${rideData.totalFare?.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Feedback */}
            {rideData.feedback && (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackLabel}>Feedback</Text>
                <Text style={styles.feedbackText}>{rideData.feedback}</Text>
              </View>
            )}
>>>>>>> 7882329 (funcional 1)
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideShareMap;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: "#F5F6F5",
    },
    mapContainer: {
      flex: 1,
      width: "100%",
    },
    map: {
      flex: 1,
    },
    mainPickupMarker: {
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
    },
    dropoffMarker: {
      alignItems: "center",
      justifyContent: "flex-start",
      width: 40,
      height: 75,
      backgroundColor: "transparent",
    },
    dropoffMarkerPin: {
      width: 22,
      height: 35,
    },
    passengerMarkerContainer: {
      alignItems: "center",
    },
    passengerImageContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.white,
      overflow: "hidden",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    passengerImage: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    locationPanel: {
      position: "absolute",
      top: Platform.OS === "ios" ? 60 : 40,
      left: 16,
      right: 16,
      zIndex: 1,
    },
    locationCard: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    locationItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    locationIconContainer: {
      marginRight: 12,
      marginTop: 6,
    },
    locationDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    locationTextContainer: {
      flex: 1,
    },
    locationLabel: {
      fontSize: 12,
      color: "#888",
      marginBottom: 4,
    },
    locationAddress: {
      fontSize: 15,
      fontWeight: "600",
      color: "#333",
    },
    // Estilos para o BottomSheet
    bottomSheetHandle: {
      backgroundColor: "white",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingVertical: 12,
      alignItems: "center",
    },
    handleBar: {
      width: 40,
      height: 3,
      backgroundColor: "#DDDDDD",
      borderRadius: 3,
    },
    rideInfoCard: {
      backgroundColor: "white",
      padding: 20,
      paddingTop: 0,
    },
    driverInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    driverInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    driverImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
    },
    driverDetails: {
      justifyContent: "center",
    },
    driverName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
    },
    driverRole: {
      fontSize: 12,
      color: "#888",
      marginTop: 2,
    },
    carInfo: {
      alignItems: "flex-end",
    },
    carModel: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
    },
    licensePlate: {
      fontSize: 12,
      color: "#666",
      marginTop: 2,
    },
    tripDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    tripDetailItem: {
      flex: 1,
    },
    tripDetailLabel: {
      fontSize: 12,
      color: "#888",
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: "row",
    },
    tripDetailValue: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
    },
    // Seção de passageiros
    passengersSection: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    passengersLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333",
      marginBottom: 8,
    },
    passengersContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    passengerItem: {
      marginRight: 16,
      marginBottom: 8,
      alignItems: "center",
    },
    passengerThumbnail: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    passengerItemName: {
      fontSize: 12,
      fontWeight: "500",
      color: "#333",
      marginTop: 4,
      textAlign: "center",
    },
    passengerRating: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    passengerRatingText: {
      fontSize: 10,
      color: "#666",
      marginLeft: 2,
    },
    fareDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    fareItem: {
      flex: 1,
    },
    fareLabel: {
      fontSize: 12,
      color: "#888",
      marginBottom: 4,
    },
    fareAmount: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
    },
    totalFare: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.primary,
    },
    feedbackContainer: {
      marginTop: 4,
    },
    feedbackLabel: {
      fontSize: 12,
      color: "#888",
      marginBottom: 4,
    },
    feedbackText: {
      fontSize: 14,
      color: "#333",
      lineHeight: 20,
    },
    searchContainer: {
      flexDirection: "row",
      paddingHorizontal: 5,
      marginTop: 220,
      marginBottom: 16,
    },
    searchBar: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.neutralLight,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginRight: 12,
    },
    searchPlaceholder: {
      color: colors.darkGrey,
      marginLeft: 8,
      fontSize: 15,
      fontFamily: "WorkSans-Regular",
    },
    mapButton: {
      width: 46,
      height: 46,
      borderRadius: 12,
      backgroundColor: colors.primaryPink,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.darkPink,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
<<<<<<< HEAD
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5F6F5",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: colors.darkGrey,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5F6F5",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: colors.errorRed,
      textAlign: "center",
      marginBottom: 20,
    },
    retryButton: {
      backgroundColor: colors.primaryPink,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    retryButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
=======
>>>>>>> 7882329 (funcional 1)
  });
