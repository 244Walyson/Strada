<<<<<<< HEAD
import React, { useState, useCallback, useEffect } from "react";
=======
import React, { useState, useCallback } from "react";
>>>>>>> 7882329 (funcional 1)
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
<<<<<<< HEAD
  StatusBar,
  Alert,
  Modal,
  ActivityIndicator,
=======
  Image,
  StatusBar,
  Alert,
>>>>>>> 7882329 (funcional 1)
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
<<<<<<< HEAD
import { colors } from "@/src/constants/colors";
import CustomCalendar from "@/src/components/shared/CustomCalendar";
import RecurringInDays from "@/src/components/offer-ride/ReccuringInDays";
import AutocompleteSearch from "@/src/components/shared/SearchBar";
import VehicleSelector from "./VehicleModal";
import RouteSelector from "./RouteSelector";
import DateTimePicker from "@react-native-community/datetimepicker";
import polyline from "@mapbox/polyline";
import { getStoredUserID } from "@/src/services/user.service";
import { createRide } from "@/src/services/ride.service";

// Tipos para os dados
interface LocationDto {
  latitude: number;
  longitude: number;
  address: string;
  name?: string;
}

interface RoutePoint {
  latitude: number;
  longitude: number;
  order?: number;
}

interface CreateRideData {
  driverId: string;
  startLocation: LocationDto;
  endLocation: LocationDto;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  vehicle: {
    model?: string;
    color?: string;
    licensePlate?: string;
  };
  preferences: {
    allowSmoking: boolean;
    allowPets: boolean;
    allowLuggage: boolean;
  };
  seats: number;
  estimatedDuration: number;
  estimatedDistance: number;
  routePath: RoutePoint[];
}

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";
=======
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "@/src/constants/colors";
import { AppImages } from "@/src/assets";
import CustomCalendar from "@/src/components/shared/CustomCalendar";
import RecurringInDays from "@/src/components/offer-ride/ReccuringInDays";

// Dados do veículo do usuário (mockados)
const userVehicle = {
  model: "Honda Civic",
  year: "2022",
  color: "Prata",
  plate: "ABC1D23",
  image: AppImages.google,
};
>>>>>>> 7882329 (funcional 1)

const OfferRideScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Estados para os campos do formulário
<<<<<<< HEAD
  const [originLocation, setOriginLocation] = useState<LocationDto | null>(
    null
  );
  const [destinationLocation, setDestinationLocation] =
    useState<LocationDto | null>(null);
=======
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
>>>>>>> 7882329 (funcional 1)
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState(3);
  const [notes, setNotes] = useState("");
  const [allowPets, setAllowPets] = useState(false);
  const [allowSmoking, setAllowSmoking] = useState(false);
<<<<<<< HEAD
  const [allowLuggage, setAllowLuggage] = useState(true);
  const [luggageSize, setLuggageSize] = useState("small");
=======
  const [luggageSize, setLuggageSize] = useState("small"); // 'small', 'medium', 'large'
>>>>>>> 7882329 (funcional 1)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecurringRide, setIsRecurringRide] = useState(false);
  const [canMakeStops, setCanMakeStops] = useState(false);
<<<<<<< HEAD
  const [vehicle, setVehicle] = useState<{
    model: string;
    color: string;
    plate: string;
  } | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchType, setSearchType] = useState<"origin" | "destination">(
    "origin"
  );
  const [driverId, setDriverId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ID do motorista - deve vir do contexto de autenticação
  useEffect(() => {
    const fetchDriverId = async () => {
      const userId = await getStoredUserID();
      setDriverId(userId);
    };
    fetchDriverId();
  }, []);

  const openSearchModal = (type: "origin" | "destination") => {
    setSearchType(type);
    setSearchModalVisible(true);
  };

  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

  const handlePlaceSelected = (place: any) => {
    console.log("Lugar selecionado:", place);
    setSearchModalVisible(false);
    const location: LocationDto = {
      latitude: place.latitude,
      longitude: place.longitude,
      address: place.address,
      name: place.name,
    };

    if (searchType === "origin") {
      setOriginLocation(location);
    } else {
      setDestinationLocation(location);
    }

    closeSearchModal();
  };

  // Função para buscar a rota no Google Maps
  const getRouteFromGoogleMaps = async (
    origin: LocationDto,
    destination: LocationDto
  ): Promise<{
    routePath: RoutePoint[];
    estimatedDuration: number;
    estimatedDistance: number;
  }> => {
    try {
      const response = await fetch(
        `https://routes.googleapis.com/directions/v2:computeRoutes`,
        {
          method: "POST", // ← faltava isso
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
          },
          body: JSON.stringify({
            // ← aqui precisa ser string
            origin: {
              location: {
                latLng: {
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                },
              },
            },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            computeAlternativeRoutes: false,
            routeModifiers: {
              avoidTolls: false,
              avoidHighways: false,
              avoidFerries: false,
            },
            languageCode: "en-US",
            units: "METRIC",
          }),
        }
      );

      const data = await response.json();

      console.log("Dados da rota:", data);

      const route = data.routes[0];

      // Decodificar polyline para obter pontos da rota
      const routePath: RoutePoint[] = decodePolyline(
        route.polyline.encodedPolyline
      );

      return {
        routePath,
        estimatedDuration: +route.duration.split("s")[0],
        estimatedDistance: route.distanceMeters, // Você pode calcular a distância se necessário
      };
    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      throw error;
    }
  };

  // Função para decodificar polyline do Google Maps
  const decodePolyline = (encoded: string): RoutePoint[] => {
    const decodedPolyline = polyline.decode(encoded);
    return decodedPolyline.map((point, index) => ({
      latitude: point[0],
      longitude: point[1],
      order: index,
    }));

    // const points: RoutePoint[] = [];
    // let index = 0;
    // let lat = 0;
    // let lng = 0;

    // while (index < encoded.length) {
    //   let b;
    //   let shift = 0;
    //   let result = 0;

    //   do {
    //     b = encoded.charCodeAt(index++) - 63;
    //     result |= (b & 0x1f) << shift;
    //     shift += 5;
    //   } while (b >= 0x20);

    //   const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    //   lat += dlat;

    //   shift = 0;
    //   result = 0;

    //   do {
    //     b = encoded.charCodeAt(index++) - 63;
    //     result |= (b & 0x1f) << shift;
    //     shift += 5;
    //   } while (b >= 0x20);

    //   const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    //   lng += dlng;

    //   points.push({
    //     latitude: lat / 1e5,
    //     longitude: lng / 1e5,
    //     order: points.length,
    //   });
    // }

    // return points;
  };

  // Função para criar a corrida
  const saveRide = async (rideData: CreateRideData) => {
    console.log("Dados da corrida:", rideData);
    try {
      return await createRide(rideData);
    } catch (error) {
      console.error("Erro ao criar corrida:", error);
      throw error;
    }
  };
=======
>>>>>>> 7882329 (funcional 1)

  // Função para voltar à tela anterior
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

<<<<<<< HEAD
  // Gerenciamento dos pickers de data e hora
  const handleStartEndDateChange = (
    startDateValue: Date | null, // Renamed to avoid conflict with state variable
    endDateValue: Date | null // Renamed to avoid conflict with state variable
  ) => {
    setstartDate(startDateValue);
    setEndDate(endDateValue);

    // Now, handle the UI logic based on the *newly updated* state
    if (!startDateValue && !endDateValue) {
      // Both are null, meaning selection was cleared or never made
      setShowDatePicker(false);
      setIsRecurringRide(false); // No selection, so not recurring
    } else if (startDateValue && !endDateValue) {
      // Only start date is selected
      setIsRecurringRide(false); // Not yet a recurring ride (needs an end date)
    } else if (startDateValue && endDateValue) {
      // Both start and end dates are selected
      if (startDateValue.getTime() === endDateValue.getTime()) {
        setIsRecurringRide(false);
      } else {
        setIsRecurringRide(true); // Different dates, not recurring
      }
      setShowDatePicker(false); // Close date picker once a range is selected
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
=======
  // Navegar para a tela de seleção de local
  const navigateToLocationPicker = useCallback((type) => {
    // Aqui você pode implementar a navegação para a tela de seleção de local
    // e depois atualizar o estado correspondente (origin ou destination)
    Alert.alert(
      "Selecionar Local",
      `Selecionar ${type === "origin" ? "origem" : "destino"} da viagem`
    );
  }, []);

  // Gerenciamento dos pickers de data e hora
  const handleStartEndDateChange = (startDate, endDate) => {
    if (!startDate && !endDate) setShowDatePicker(false);
    if (startDate) setstartDate(startDate);
    setEndDate(endDate);
    if (!endDate) setIsRecurringRide(false);
    if (startDate && endDate) {
      setIsRecurringRide(true);
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
>>>>>>> 7882329 (funcional 1)
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const formatDate = (date: Date) => {
    if (!date) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "");
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

<<<<<<< HEAD
  const formatTime = (time: Date) => {
=======
  const formatTime = (time) => {
>>>>>>> 7882329 (funcional 1)
    return time?.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

<<<<<<< HEAD
  const handleVehicleChange = (vehicle: any) => {
    setVehicle(vehicle);
  };

=======
>>>>>>> 7882329 (funcional 1)
  // Ajustar número de assentos disponíveis
  const decreaseSeats = () => {
    if (availableSeats > 1) setAvailableSeats(availableSeats - 1);
  };

  const increaseSeats = () => {
    if (availableSeats <= 42) setAvailableSeats(availableSeats + 1);
  };

  // Publicar a carona
<<<<<<< HEAD
  const handlePublishRide = useCallback(async () => {
    // Validação básica dos campos
    if (!originLocation || !destinationLocation || !price) {
=======
  const handlePublishRide = useCallback(() => {
    // Validação básica dos campos
    if (!origin || !destination || !price) {
>>>>>>> 7882329 (funcional 1)
      Alert.alert(
        "Dados incompletos",
        "Por favor, preencha todos os campos obrigatórios."
      );
      return;
    }

<<<<<<< HEAD
    setIsLoading(true);

    try {
      // Buscar rota no Google Maps
      const routeData = await getRouteFromGoogleMaps(
        originLocation,
        destinationLocation
      );

      // Criar data de partida combinando data e hora
      const departureDateTime = new Date(startDate);
      departureDateTime.setHours(time.getHours());
      departureDateTime.setMinutes(time.getMinutes());

      // Preparar dados para o endpoint
      const rideData: CreateRideData = {
        driverId,
        startLocation: originLocation,
        endLocation: destinationLocation,
        departureTime: departureDateTime.toISOString(),
        availableSeats,
        pricePerSeat: parseFloat(price.replace(",", ".")),
        vehicle: {
          model: vehicle?.model,
          color: vehicle?.color,
          licensePlate: vehicle?.licensePlate,
        },
        preferences: {
          allowSmoking,
          allowPets,
          allowLuggage,
        },
        estimatedDuration: routeData.estimatedDuration,
        estimatedDistance: routeData.estimatedDistance,
        routePath: routeData.routePath,
      };

      // Criar a corrida
      await saveRide(rideData);
      router.push("/ride-history/ride-history");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao publicar sua carona. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    originLocation,
    destinationLocation,
    price,
    startDate,
    time,
    availableSeats,
    allowSmoking,
    allowPets,
    allowLuggage,
    driverId,
    router,
  ]);
=======
    // Aqui você implementaria a lógica para publicar a carona no backend
    Alert.alert("Carona Publicada", "Sua carona foi publicada com sucesso!", [
      {
        text: "OK",
        onPress: () => router.push("/rides/my-rides"),
      },
    ]);
  }, [origin, destination, price, router]);
>>>>>>> 7882329 (funcional 1)

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Oferecer Carona</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Seção: Veículo */}
<<<<<<< HEAD
        <VehicleSelector
          vehicle={vehicle}
          onVehicleChange={handleVehicleChange}
        />

        {/* Seção: Rota */}
        <RouteSelector
          originLocation={originLocation}
          destinationLocation={destinationLocation}
          openSearchModal={(value) => openSearchModal(value)}
        ></RouteSelector>
        <Modal
          visible={searchModalVisible}
          animationType="slide"
          onRequestClose={closeSearchModal}
        >
          <AutocompleteSearch
            onSelectPlace={(value) => handlePlaceSelected(value)}
            onBack={closeSearchModal}
          />
        </Modal>
=======
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="directions-car" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Seu Veículo</Text>
          </View>

          <View style={styles.vehicleCard}>
            <Image
              source={userVehicle.image}
              style={styles.vehicleImage}
              resizeMode="contain"
            />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleModel}>
                {userVehicle.model} • {userVehicle.year}
              </Text>
              <Text style={styles.vehicleDetails}>
                {userVehicle.color} • {userVehicle.plate}
              </Text>
              <TouchableOpacity style={styles.changeVehicleButton}>
                <Text style={styles.changeVehicleText}>Alterar veículo</Text>
                <Icon
                  name="chevron-right"
                  size={16}
                  color={colors.primaryBlue}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Seção: Rota */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="map" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Rota da Viagem</Text>
          </View>

          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => navigateToLocationPicker("origin")}
          >
            <View style={[styles.locationDot, styles.originDot]} />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Origem</Text>
              <Text
                style={[styles.locationText, !origin && styles.placeholderText]}
              >
                {origin || "De onde você vai partir?"}
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.darkGrey} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => navigateToLocationPicker("destination")}
          >
            <View style={[styles.locationDot, styles.destinationDot]} />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Destino</Text>
              <Text
                style={[
                  styles.locationText,
                  !destination && styles.placeholderText,
                ]}
              >
                {destination || "Para onde você vai?"}
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.darkGrey} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addStopButton}>
            <Icon
              name="add-circle-outline"
              size={18}
              color={colors.primaryBlue}
            />
            <Text style={styles.addStopText}>Adicionar parada</Text>
          </TouchableOpacity>
        </View>
>>>>>>> 7882329 (funcional 1)

        {/* Seção: Data e Hora */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="schedule" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Data e Hora</Text>
          </View>

          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="event" size={22} color={colors.darkGrey} />
              <View>
                <Text style={styles.dateTimeText}>{formatDate(startDate)}</Text>
<<<<<<< HEAD
                {endDate && endDate.getTime() !== startDate.getTime() && (
=======
                {endDate && (
>>>>>>> 7882329 (funcional 1)
                  <Text style={styles.dateTimeText}>{formatDate(endDate)}</Text>
                )}
              </View>
              <Icon name="arrow-drop-down" size={22} color={colors.darkGrey} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => setShowTimePicker(true)}
            >
              <Icon name="access-time" size={22} color={colors.darkGrey} />
              <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
              <Icon name="arrow-drop-down" size={22} color={colors.darkGrey} />
            </TouchableOpacity>
<<<<<<< HEAD

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
              />
            )}
=======
>>>>>>> 7882329 (funcional 1)
          </View>

          {/* Pickers para data e hora (visíveis quando clicados) */}
          {showDatePicker && (
            <CustomCalendar
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
              startEndDateChange={handleStartEndDateChange}
            />
          )}

<<<<<<< HEAD
=======
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}

>>>>>>> 7882329 (funcional 1)
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Carona recorrente</Text>
            <Switch
              value={isRecurringRide}
              onValueChange={setIsRecurringRide}
              disabled={(isRecurringRide && !startDate) || !endDate}
              trackColor={{ false: colors.grey, true: colors.lightPink }}
              thumbColor={isRecurringRide ? colors.primaryPink : colors.white}
            />
          </View>
          {isRecurringRide && <RecurringInDays />}
<<<<<<< HEAD

          <View style={styles.routeInfoContainer}>
            <Icon name="info-outline" size={16} color={colors.primaryBlue} />
            <Text style={styles.routeInfoText}>
              Selecione o range de datas e horário para a carona. Se a carona
              ocorrer em um dia específico, selecione a mesma data para início e
              fim.
            </Text>
          </View>
=======
>>>>>>> 7882329 (funcional 1)
        </View>

        {/* Seção: Preço e Assentos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="payments" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Preço e Assentos</Text>
          </View>

          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={setPrice}
              placeholder="0,00"
              keyboardType="numeric"
              placeholderTextColor={colors.darkGrey}
            />
            <Text style={styles.perPersonText}>por pessoa</Text>
          </View>

          <View style={styles.seatsContainer}>
            <Text style={styles.seatsLabel}>Assentos disponíveis</Text>
            <View style={styles.seatsSelector}>
              <TouchableOpacity
                style={styles.seatButton}
                onPress={decreaseSeats}
                disabled={availableSeats <= 1}
              >
                <Icon
                  name="remove"
                  size={20}
                  color={availableSeats <= 1 ? colors.grey : colors.darkGrey}
                />
              </TouchableOpacity>
              <View style={styles.seatsCountContainer}>
                <Text style={styles.seatsCount}>{availableSeats}</Text>
              </View>
              <TouchableOpacity
                style={styles.seatButton}
                onPress={increaseSeats}
                disabled={availableSeats >= 42}
              >
                <Icon
                  name="add"
                  size={20}
                  color={availableSeats >= 42 ? colors.grey : colors.darkGrey}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Seção: Preferências */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="tune" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Preferências</Text>
          </View>

          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Icon name="smoke-free" size={20} color={colors.darkGrey} />
                <Text style={styles.preferenceLabel}>Permitir fumar</Text>
              </View>
              <Switch
                value={allowSmoking}
                onValueChange={setAllowSmoking}
                trackColor={{ false: colors.grey, true: colors.lightPink }}
                thumbColor={allowSmoking ? colors.primaryPink : colors.white}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Icon name="pets" size={20} color={colors.darkGrey} />
                <Text style={styles.preferenceLabel}>Permitir animais</Text>
              </View>
              <Switch
                value={allowPets}
                onValueChange={setAllowPets}
                trackColor={{ false: colors.grey, true: colors.lightPink }}
                thumbColor={allowPets ? colors.primaryPink : colors.white}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
<<<<<<< HEAD
                <Icon name="luggage" size={20} color={colors.darkGrey} />
                <Text style={styles.preferenceLabel}>Permitir bagagem</Text>
              </View>
              <Switch
                value={allowLuggage}
                onValueChange={setAllowLuggage}
                trackColor={{ false: colors.grey, true: colors.lightPink }}
                thumbColor={allowLuggage ? colors.primaryPink : colors.white}
              />
            </View>

            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
=======
>>>>>>> 7882329 (funcional 1)
                <Icon name="more-horiz" size={20} color={colors.darkGrey} />
                <Text style={styles.preferenceLabel}>Pode fazer paradas</Text>
              </View>
              <Switch
                value={canMakeStops}
                onValueChange={setCanMakeStops}
                trackColor={{ false: colors.grey, true: colors.lightPink }}
                thumbColor={canMakeStops ? colors.primaryPink : colors.white}
              />
            </View>
          </View>

          <View style={styles.luggageSizeContainer}>
            <Text style={styles.luggageLabel}>Tamanho máximo de bagagem:</Text>
            <View style={styles.luggageOptions}>
              <TouchableOpacity
                style={[
                  styles.luggageOption,
                  luggageSize === "small" && styles.luggageSelected,
                ]}
                onPress={() => setLuggageSize("small")}
              >
                <Icon
                  name="work"
                  size={18}
                  color={
                    luggageSize === "small" ? colors.white : colors.darkGrey
                  }
                />
                <Text
                  style={[
                    styles.luggageText,
                    luggageSize === "small" && styles.luggageTextSelected,
                  ]}
                >
                  Pequena
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.luggageOption,
                  luggageSize === "medium" && styles.luggageSelected,
                ]}
                onPress={() => setLuggageSize("medium")}
              >
                <Icon
                  name="work"
                  size={22}
                  color={
                    luggageSize === "medium" ? colors.white : colors.darkGrey
                  }
                />
                <Text
                  style={[
                    styles.luggageText,
                    luggageSize === "medium" && styles.luggageTextSelected,
                  ]}
                >
                  Média
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.luggageOption,
                  luggageSize === "large" && styles.luggageSelected,
                ]}
                onPress={() => setLuggageSize("large")}
              >
                <Icon
                  name="luggage"
                  size={24}
                  color={
                    luggageSize === "large" ? colors.white : colors.darkGrey
                  }
                />
                <Text
                  style={[
                    styles.luggageText,
                    luggageSize === "large" && styles.luggageTextSelected,
                  ]}
                >
                  Grande
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Seção: Observações */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="description" size={20} color={colors.primaryPink} />
            <Text style={styles.sectionTitle}>Observações</Text>
          </View>

          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Adicione informações importantes para os passageiros, como ponto de encontro, regras, etc."
            placeholderTextColor={colors.darkGrey}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Footer com botão de publicar */}
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity
<<<<<<< HEAD
          style={[
            styles.publishButton,
            isLoading && styles.publishButtonDisabled,
          ]}
          onPress={handlePublishRide}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.publishButtonText}>Publicar Carona</Text>
          )}
=======
          style={styles.publishButton}
          onPress={handlePublishRide}
          activeOpacity={0.8}
        >
          <Text style={styles.publishButtonText}>Publicar Carona</Text>
>>>>>>> 7882329 (funcional 1)
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutralLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginLeft: 8,
  },
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    padding: 12,
  },
  vehicleImage: {
    width: 80,
    height: 60,
    marginRight: 12,
  },
<<<<<<< HEAD
  routeInfoText: {
    fontSize: 13,
    color: colors.primaryBlue,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  routeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
=======
>>>>>>> 7882329 (funcional 1)
  vehicleInfo: {
    flex: 1,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 2,
  },
  vehicleDetails: {
    fontSize: 14,
    color: colors.darkGrey,
    marginBottom: 6,
  },
  changeVehicleButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeVehicleText: {
    fontSize: 14,
    color: colors.primaryBlue,
    marginRight: 4,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 10,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  originDot: {
    backgroundColor: colors.primaryPink,
  },
  destinationDot: {
    backgroundColor: colors.primaryBlue,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.darkGrey,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 15,
    color: colors.black,
  },
  placeholderText: {
    color: colors.darkGrey,
    fontStyle: "italic",
  },
  addStopButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderStyle: "dashed",
=======
    marginTop: 4,
    paddingVertical: 8,
>>>>>>> 7882329 (funcional 1)
  },
  addStopText: {
    fontSize: 14,
    color: colors.primaryBlue,
    marginLeft: 6,
  },
  dateTimeContainer: {
    flexDirection: "row",
<<<<<<< HEAD
    gap: 12,
  },
  dateTimeInput: {
    flex: 1,
=======
    justifyContent: "space-between",
  },
  dateTimeInput: {
>>>>>>> 7882329 (funcional 1)
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    paddingHorizontal: 12,
<<<<<<< HEAD
    paddingVertical: 14,
  },
  dateTimeText: {
    fontSize: 15,
    color: colors.black,
    marginLeft: 8,
    marginRight: 8,
    width: "100%",
=======
    paddingVertical: 12,
    width: "48%",
  },
  dateTimeText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
>>>>>>> 7882329 (funcional 1)
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
<<<<<<< HEAD
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
=======
>>>>>>> 7882329 (funcional 1)
    marginTop: 16,
  },
  switchLabel: {
    fontSize: 15,
    color: colors.black,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
<<<<<<< HEAD
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
=======
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkGrey,
>>>>>>> 7882329 (funcional 1)
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
<<<<<<< HEAD
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    padding: 0,
=======
    fontSize: 16,
    color: colors.black,
>>>>>>> 7882329 (funcional 1)
  },
  perPersonText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  seatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
<<<<<<< HEAD
=======
    marginTop: 16,
>>>>>>> 7882329 (funcional 1)
  },
  seatsLabel: {
    fontSize: 15,
    color: colors.black,
  },
  seatsSelector: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
=======
>>>>>>> 7882329 (funcional 1)
  },
  seatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
<<<<<<< HEAD
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    marginHorizontal: 2,
  },
  seatsCountContainer: {
    paddingHorizontal: 16,
  },
  seatsCount: {
    fontSize: 18,
=======
    backgroundColor: colors.neutralLight,
    justifyContent: "center",
    alignItems: "center",
  },
  seatsCountContainer: {
    width: 40,
    alignItems: "center",
  },
  seatsCount: {
    fontSize: 16,
>>>>>>> 7882329 (funcional 1)
    fontWeight: "600",
    color: colors.black,
  },
  preferencesContainer: {
<<<<<<< HEAD
    gap: 16,
=======
    marginBottom: 16,
>>>>>>> 7882329 (funcional 1)
  },
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
<<<<<<< HEAD
=======
    marginBottom: 12,
>>>>>>> 7882329 (funcional 1)
  },
  preferenceInfo: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    flex: 1,
=======
>>>>>>> 7882329 (funcional 1)
  },
  preferenceLabel: {
    fontSize: 15,
    color: colors.black,
    marginLeft: 12,
  },
  luggageSizeContainer: {
<<<<<<< HEAD
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
=======
    marginTop: 4,
>>>>>>> 7882329 (funcional 1)
  },
  luggageLabel: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 12,
  },
  luggageOptions: {
    flexDirection: "row",
<<<<<<< HEAD
    gap: 8,
=======
    justifyContent: "space-between",
>>>>>>> 7882329 (funcional 1)
  },
  luggageOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.neutralLight,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  luggageSelected: {
    backgroundColor: colors.primaryPink,
    borderColor: colors.primaryPink,
  },
  luggageText: {
    fontSize: 13,
=======
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  luggageSelected: {
    backgroundColor: colors.primaryPink,
  },
  luggageText: {
    fontSize: 14,
>>>>>>> 7882329 (funcional 1)
    color: colors.darkGrey,
    marginLeft: 6,
  },
  luggageTextSelected: {
    color: colors.white,
  },
  notesInput: {
    backgroundColor: colors.neutralLight,
    borderRadius: 8,
    paddingHorizontal: 12,
<<<<<<< HEAD
    paddingVertical: 12,
    fontSize: 15,
    color: colors.black,
    minHeight: 100,
    textAlignVertical: "top",
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
=======
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
>>>>>>> 7882329 (funcional 1)
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  publishButton: {
    backgroundColor: colors.primaryPink,
<<<<<<< HEAD
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonDisabled: {
    backgroundColor: colors.grey,
    shadowOpacity: 0,
    elevation: 0,
=======
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
>>>>>>> 7882329 (funcional 1)
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

export default OfferRideScreen;
