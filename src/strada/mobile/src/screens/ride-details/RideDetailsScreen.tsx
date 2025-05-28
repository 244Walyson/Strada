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
<<<<<<< HEAD
  StatusBar,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
=======
  Image,
  StatusBar,
  Alert,
  useWindowDimensions,
>>>>>>> 7882329 (funcional 1)
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
<<<<<<< HEAD
import { getRideById } from "@/src/services/ride.service";
import { getStoredUserID, getUser } from "@/src/services/user.service";
import CreateRideRequestModal from "./RideRequestModal";

// Types
interface RideData {
  id: string;
  driverId: string;
  startAddress: string;
  endAddress: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  allowLuggage: boolean;
  estimatedDuration: number;
  estimatedDistance: number;
  actualDuration: number | null;
  actualDistance: number | null;
  actualStartTime: string | null;
  actualEndTime: string | null;
  createdAt: string;
  updatedAt: string;
  currentLatitude: number | null;
  currentLongitude: number | null;
  lastLocationUpdate: string | null;
  routePoints: RoutePoint[];
  requests: RideRequest[];
  driverName: string;
  driverProfileImg?: string;
}

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface RideRequest {
  id: string;
  userId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  requestedSeats: number;
  message?: string;
  createdAt: string;
}

interface Colors {
  white: string;
  black: string;
  primaryPink: string;
  lightPink: string;
  darkPink: string;
  neutralLight: string;
  primaryBlue: string;
  primaryBlueDarkTheme: string;
  secondaryBlue: string;
  accentBlue: string;
  softBlue: string;
  lightGrey: string;
  grey: string;
  darkGrey: string;
}

const colors: Colors = {
=======
import { AppImages } from "@/src/assets";

const colors = {
>>>>>>> 7882329 (funcional 1)
  white: "#FFFFFF",
  black: "#1A1A1A",
  primaryPink: "#FF758F",
  lightPink: "#FFD1DC",
  darkPink: "#E63950",
  neutralLight: "#F0F2F5",
  primaryBlue: "#003360",
  primaryBlueDarkTheme: "#1E90FF",
  secondaryBlue: "#4D8CFF",
  accentBlue: "#66A3FF",
  softBlue: "#E6F0FF",
  lightGrey: "#F0F0F0",
  grey: "#BDBDBD",
  darkGrey: "#8C8C8C",
};

<<<<<<< HEAD
const RideDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { rideId } = useLocalSearchParams();
  const [alreadyReserved, setAlreadyReserved] = useState<boolean>(false);

  const [favorite, setFavorite] = useState<boolean>(false);
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isRequestModalVisible, setIsRequestModalVisible] =
    useState<boolean>(false);

  // Função para formatar data
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // Função para formatar horário
  const formatTime = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Função para calcular horário estimado de chegada
  const calculateArrivalTime = useCallback(
    (departureTime: string, duration: number): string => {
      const departure = new Date(departureTime);
      const arrival = new Date(departure.getTime() + duration * 60000); // duration em minutos
      return arrival.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    []
  );

  // Função para formatar endereço (pegar apenas parte principal)
  const formatAddress = useCallback((address: string): string => {
    return address.split("–")[0].trim();
  }, []);

  // Função para obter nickname do endereço
  const getAddressNickname = useCallback(
    (address: string): string => {
      const parts = address.split(",");
      return parts.length > 1
        ? parts[1].split(",")[0].trim()
        : formatAddress(address);
    },
    [formatAddress]
  );

  // Função para obter texto do status
  const getStatusText = useCallback((status: RideData["status"]): string => {
    const statusMap: Record<RideData["status"], string> = {
      PENDING: "Aguardando passageiros",
      ACTIVE: "Em andamento",
      COMPLETED: "Concluída",
      CANCELLED: "Cancelada",
    };
    return statusMap[status] || status;
  }, []);

  const alreadyReservedRide = useCallback(async () => {
    const userId = await getStoredUserID();
    if (!rideData) return false;

    return rideData.requests.some((request) => request.passengerId === userId);
  }, [rideData]);

  useEffect(() => {
    const checkIfAlreadyReserved = async () => {
      if (rideData) {
        console.log(rideData);
        const reserved = await alreadyReservedRide();
        setAlreadyReserved(reserved);
      }
    };
    checkIfAlreadyReserved();
  }, [rideData, alreadyReservedRide]);

  // Função para obter cor do status
  const getStatusColor = useCallback(
    (status: RideData["status"]): { background: string; text: string } => {
      const colorMap: Record<
        RideData["status"],
        { background: string; text: string }
      > = {
        PENDING: { background: colors.softBlue, text: colors.primaryBlue },
        ACTIVE: { background: colors.lightPink, text: colors.primaryPink },
        COMPLETED: { background: "#E8F5E8", text: "#4CAF50" },
        CANCELLED: { background: "#FFEBEE", text: "#F44336" },
      };
      return (
        colorMap[status] || {
          background: colors.lightGrey,
          text: colors.darkGrey,
        }
      );
    },
    []
  );

  // Carregar dados da carona
  useEffect(() => {
    const loadRideData = async (): Promise<void> => {
      if (!rideId) {
        setError("ID da carona não fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data: RideData = await getRideById(rideId as string);
        const { name, imgUrl } = await getUser(data.driverId);

        setRideData({
          ...data,
          driverName: name,
          driverProfileImg: imgUrl,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao carregar dados da carona";
        setError(errorMessage);
        console.error("Erro ao buscar carona:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRideData();
  }, [rideId]);

  const handleGoBack = useCallback((): void => {
    router.back();
  }, [router]);

  const toggleFavorite = useCallback((): void => {
    setFavorite((prev) => !prev);
  }, []);

  const handleShare = useCallback((): void => {
=======
// Dados mockados para a carona selecionada
const rideData = {
  id: "1",
  driver: "Mariana Silva",
  avatar: AppImages.github,
  origin: "São Paulo - Avenida Paulista, 1578",
  originNickname: "MASP",
  destination: "Campinas - Terminal Rodoviário",
  destinationNickname: "Rodoviária de Campinas",
  date: "26 de Abril, 2025",
  time: "17:30",
  price: "R$ 35",
  rating: 4.9,
  reviewsCount: 124,
  totalRides: 312,
  memberSince: "Março 2023",
  seatsTotal: 3,
  seatsAvailable: 2,
  preferences: ["Não fumar", "Animais: Não", "Bagagem pequena"],
  vehicle: {
    model: "Honda Civic",
    year: "2022",
    color: "Prata",
    plate: "ABC1D23",
  },
  schedule: {
    departureWindow: "15min",
    stops: "Sem paradas",
    estimatedArrival: "19:15",
  },
  participants: [
    {
      id: "1",
      name: "Carlos M.",
      avatar: AppImages.github,
      rating: 4.7,
    },
  ],
};

const RideDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const [favorite, setFavorite] = useState(false);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const toggleFavorite = useCallback(() => {
    setFavorite((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
>>>>>>> 7882329 (funcional 1)
    Alert.alert(
      "Compartilhar",
      "Funcionalidade de compartilhamento será implementada."
    );
  }, []);

<<<<<<< HEAD
  const handleReserve = useCallback((): void => {
    console.log("Tentando reservar carona...");
    console.log(alreadyReserved, isOwner);
    if (isOwner || alreadyReserved) {
      router.push(`/map/${rideId}`);
      return;
    }
    console.log("Abrindo modal de solicitação de carona...");
    setIsRequestModalVisible(true);
  }, [alreadyReserved, isOwner, rideId]);

  const handleRequestSuccess = useCallback(() => {
    setIsRequestModalVisible(false);
    router.push(`/map/${rideId}`);
  }, []);

  const handleChat = useCallback((): void => {
    if (rideData?.driverId) {
      router.push(`/chat/${rideData.driverId}`);
    }
  }, [router, rideData]);

  // Função para obter ícone de preferência
  const getPreferenceIcon = useCallback((preference: string): string => {
    if (preference.toLowerCase().includes("fumar")) return "smoke-free";
    if (preference.toLowerCase().includes("bagagem")) return "luggage";
    if (preference.toLowerCase().includes("animais")) return "pets";
    return "info";
  }, []);

  const isRideOwner = async () => {
    const userId = await getStoredUserID();
    const isOwner = rideData?.driverId === userId;
    setIsOwner(isOwner);
  };

  useEffect(() => {
    const checkIfRideOwner = async () => {
      await isRideOwner();
    };
    checkIfRideOwner();
  }, [rideData]);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Carona</Text>
          <View style={styles.headerActions} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryPink} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error || !rideData) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Carona</Text>
          <View style={styles.headerActions} />
        </View>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={48} color={colors.darkGrey} />
          <Text style={styles.errorText}>
            {error || "Carona não encontrada"}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleGoBack}>
            <Text style={styles.retryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const arrivalTime = calculateArrivalTime(
    rideData.departureTime,
    rideData.estimatedDuration
  );
  const statusColors = getStatusColor(rideData.status);

=======
  const handleReserve = useCallback(() => {
    Alert.alert("Reservar Carona", "Você deseja reservar esta carona?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => router.push("/ride/confirm"),
      },
    ]);
  }, [router]);

  const handleChat = useCallback(() => {
    router.push(`/chat/${rideData.driver.replace(/\s/g, "").toLowerCase()}`);
  }, [router, rideData]);

>>>>>>> 7882329 (funcional 1)
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Carona</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleFavorite}
          >
            <Icon
              name={favorite ? "favorite" : "favorite-border"}
              size={22}
              color={favorite ? colors.primaryPink : colors.darkGrey}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Icon name="share" size={22} color={colors.darkGrey} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Card Principal */}
        <View style={styles.mainCard}>
          {/* Informações Básicas */}
          <View style={styles.rideBasicInfo}>
            <View style={styles.routeAndTime}>
              <View style={styles.routeContainer}>
                <View style={styles.routePoint}>
                  <View style={styles.originDot} />
                  <View style={styles.routeInfo}>
<<<<<<< HEAD
                    <Text style={styles.routeTime}>
                      {formatTime(rideData.departureTime)}
                    </Text>
                    <View>
                      <Text style={styles.routeLocation}>
                        {getAddressNickname(rideData.startAddress)}
                      </Text>
                      <Text style={styles.routeAddress} numberOfLines={1}>
                        {formatAddress(rideData.startAddress)}
=======
                    <Text style={styles.routeTime}>{rideData.time}</Text>
                    <View>
                      <Text style={styles.routeLocation}>
                        {rideData.originNickname}
                      </Text>
                      <Text style={styles.routeAddress} numberOfLines={1}>
                        {rideData.origin}
>>>>>>> 7882329 (funcional 1)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.routeLine}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <View key={i} style={styles.routeDot} />
                  ))}
                </View>

                <View style={styles.routePoint}>
                  <View style={styles.destinationDot} />
                  <View style={styles.routeInfo}>
<<<<<<< HEAD
                    <Text style={styles.routeTime}>{arrivalTime}</Text>
                    <View>
                      <Text style={styles.routeLocation}>
                        {getAddressNickname(rideData.endAddress)}
                      </Text>
                      <Text style={styles.routeAddress} numberOfLines={1}>
                        {formatAddress(rideData.endAddress)}
=======
                    <Text style={styles.routeTime}>
                      {rideData.schedule.estimatedArrival}
                    </Text>
                    <View>
                      <Text style={styles.routeLocation}>
                        {rideData.destinationNickname}
                      </Text>
                      <Text style={styles.routeAddress} numberOfLines={1}>
                        {rideData.destination}
>>>>>>> 7882329 (funcional 1)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.priceAndDateContainer}>
              <View style={styles.dateContainer}>
                <Icon name="event" size={16} color={colors.darkGrey} />
<<<<<<< HEAD
                <Text style={styles.dateText}>
                  {formatDate(rideData.departureTime)}
                </Text>
              </View>

              <View style={styles.priceTag}>
                <Text style={styles.priceText}>
                  R$ {rideData.pricePerSeat.toFixed(2)}
                </Text>
=======
                <Text style={styles.dateText}>{rideData.date}</Text>
              </View>

              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{rideData.price}</Text>
>>>>>>> 7882329 (funcional 1)
                <Text style={styles.pricePerPerson}>por pessoa</Text>
              </View>
            </View>
          </View>

          {/* Informações do Motorista */}
          <View style={styles.driverSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Motorista</Text>
            </View>

            <View style={styles.driverInfo}>
<<<<<<< HEAD
              <Icon
                name="account-circle"
                size={50}
                color={colors.primaryPink}
                style={styles.driverAvatar}
              />
              <View style={styles.driverDetails}>
                <View style={styles.driverNameAndRating}>
                  <Text style={styles.driverName}>{rideData.driverName}</Text>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>
                <Text style={styles.reviewsText}>85 avaliações</Text>
                <View style={styles.driverStats}>
                  <Text style={styles.statsText}>150 caronas</Text>
                  <Text style={styles.statsText}>•</Text>
                  <Text style={styles.statsText}>Membro desde Mar 2023</Text>
=======
              <Image source={rideData.avatar} style={styles.driverAvatar} />
              <View style={styles.driverDetails}>
                <View style={styles.driverNameAndRating}>
                  <Text style={styles.driverName}>{rideData.driver}</Text>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{rideData.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewsText}>
                  {rideData.reviewsCount} avaliações
                </Text>
                <View style={styles.driverStats}>
                  <Text style={styles.statsText}>
                    {rideData.totalRides} caronas
                  </Text>
                  <Text style={styles.statsText}>•</Text>
                  <Text style={styles.statsText}>
                    Membro desde {rideData.memberSince}
                  </Text>
>>>>>>> 7882329 (funcional 1)
                </View>
              </View>
              <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
                <Icon name="chat" size={20} color={colors.primaryBlue} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Detalhes da Viagem */}
          <View style={styles.tripDetailsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Detalhes da Viagem</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Icon name="schedule" size={20} color={colors.darkGrey} />
                <View style={styles.detailTextContainer}>
<<<<<<< HEAD
                  <Text style={styles.detailLabel}>Duração estimada</Text>
                  <Text style={styles.detailValue}>
                    {rideData.estimatedDuration} min
=======
                  <Text style={styles.detailLabel}>Janela de partida</Text>
                  <Text style={styles.detailValue}>
                    {rideData.schedule.departureWindow}
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Icon
                  name="airline-seat-recline-normal"
                  size={20}
                  color={colors.darkGrey}
                />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Assentos</Text>
                  <Text style={styles.detailValue}>
<<<<<<< HEAD
                    {rideData.availableSeats} disponíveis
=======
                    {rideData.seatsAvailable} de {rideData.seatsTotal}{" "}
                    disponíveis
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Icon name="directions-car" size={20} color={colors.darkGrey} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Veículo</Text>
                  <Text style={styles.detailValue}>
<<<<<<< HEAD
                    {rideData.vehicleModel}
=======
                    {rideData.vehicle.model} • {rideData.vehicle.color}
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
<<<<<<< HEAD
                <Icon name="colorize" size={20} color={colors.darkGrey} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Cor</Text>
                  <Text style={styles.detailValue}>
                    {rideData.vehicleColor}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Icon name="straighten" size={20} color={colors.darkGrey} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Distância</Text>
                  <Text style={styles.detailValue}>
                    {rideData.estimatedDistance} km
=======
                <Icon name="more-horiz" size={20} color={colors.darkGrey} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Paradas</Text>
                  <Text style={styles.detailValue}>
                    {rideData.schedule.stops}
>>>>>>> 7882329 (funcional 1)
                  </Text>
                </View>
              </View>
            </View>
          </View>

<<<<<<< HEAD
          {/* Status da Carona */}
          <View style={styles.statusSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Status</Text>
            </View>

            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColors.background },
                ]}
              >
                <Text style={[styles.statusText, { color: statusColors.text }]}>
                  {getStatusText(rideData.status)}
                </Text>
              </View>
            </View>
          </View>

          {/* Informações Adicionais */}
          <View style={styles.additionalInfoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Informações Adicionais</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Placa do veículo:</Text>
              <Text style={styles.infoValue}>{rideData.licensePlate}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Criada em:</Text>
              <Text style={styles.infoValue}>
                {formatDate(rideData.createdAt)}
              </Text>
            </View>

            {rideData.requests.length > 0 && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Solicitações:</Text>
                <Text style={styles.infoValue}>{rideData.requests.length}</Text>
              </View>
            )}
=======
          {/* Preferências */}
          <View style={styles.preferencesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Preferências do Motorista</Text>
            </View>

            <View style={styles.preferencesList}>
              {rideData.preferences.map((preference, index) => (
                <View key={index} style={styles.preferenceItem}>
                  <Icon
                    name={
                      preference.includes("fumar")
                        ? "smoke-free"
                        : preference.includes("Animais")
                        ? "pets"
                        : "luggage"
                    }
                    size={18}
                    color={colors.darkGrey}
                  />
                  <Text style={styles.preferenceText}>{preference}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Passageiros */}
          <View style={styles.passengersSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Passageiros ({rideData.participants.length})
              </Text>
            </View>

            <View style={styles.passengersList}>
              {rideData.participants.map((passenger) => (
                <View key={passenger.id} style={styles.passengerItem}>
                  <Image
                    source={passenger.avatar}
                    style={styles.passengerAvatar}
                  />
                  <View style={styles.passengerDetails}>
                    <Text style={styles.passengerName}>{passenger.name}</Text>
                    <View style={styles.passengerRating}>
                      <Icon name="star" size={14} color="#FFD700" />
                      <Text style={styles.passengerRatingText}>
                        {passenger.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {Array.from({ length: rideData.seatsAvailable }).map(
                (_, index) => (
                  <View
                    key={`empty-${index}`}
                    style={styles.emptyPassengerSlot}
                  >
                    <View style={styles.emptyAvatar}>
                      <Icon name="person" size={20} color={colors.grey} />
                    </View>
                    <Text style={styles.emptySlotText}>Assento disponível</Text>
                  </View>
                )
              )}
            </View>
          </View>

          {/* Observações (opcional) */}
          <View style={styles.notesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Observações do Motorista</Text>
            </View>
            <Text style={styles.notesText}>
              Encontro no ponto de táxi em frente ao MASP. Posso esperar até 10
              minutos após o horário combinado. Viagem direta sem paradas para
              lanches. Traga apenas bagagem que caiba no porta-malas.
            </Text>
>>>>>>> 7882329 (funcional 1)
          </View>
        </View>
      </ScrollView>

<<<<<<< HEAD
      {/* Footer with reservation button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.availableSeatsText}>
            {rideData.availableSeats}{" "}
            {rideData.availableSeats === 1
              ? "lugar disponível"
              : "lugares disponíveis"}
          </Text>
          <Text style={styles.priceFooterText}>
            R$ {rideData.pricePerSeat.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.reserveButton,
            {
              opacity:
                rideData.availableSeats > 0 && rideData.status === "PENDING"
                  ? 1
                  : 0.5,
            },
          ]}
          onPress={handleReserve}
          activeOpacity={0.8}
          disabled={
            rideData.availableSeats === 0 || rideData.status !== "PENDING"
          }
        >
          <Text style={styles.reserveButtonText}>
            {isOwner || alreadyReserved
              ? "Ver Detalhes"
              : rideData.availableSeats > 0 && rideData.status === "PENDING"
              ? "Reservar"
              : rideData.status !== "PENDING"
              ? "Indisponível"
              : "Esgotado"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ride Request Modal */}
      <CreateRideRequestModal
        isVisible={isRequestModalVisible}
        onClose={() => setIsRequestModalVisible(false)}
        rideId={rideData.id}
        availableSeats={rideData.availableSeats}
        onSuccess={handleRequestSuccess}
      />
=======
      {/* Footer com botão de reserva */}
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.availableSeatsText}>
            {rideData.seatsAvailable}{" "}
            {rideData.seatsAvailable === 1
              ? "lugar disponível"
              : "lugares disponíveis"}
          </Text>
          <Text style={styles.priceFooterText}>{rideData.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleReserve}
          activeOpacity={0.8}
        >
          <Text style={styles.reserveButtonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
>>>>>>> 7882329 (funcional 1)
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },
<<<<<<< HEAD
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.darkGrey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.darkGrey,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.primaryPink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
=======
>>>>>>> 7882329 (funcional 1)
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  rideBasicInfo: {
    marginBottom: 16,
  },
  routeAndTime: {
    marginBottom: 16,
  },
  routeContainer: {
    width: "100%",
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  originDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryPink,
    marginTop: 4,
    marginRight: 12,
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryBlue,
    marginTop: 4,
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
    flexDirection: "row",
  },
  routeTime: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    width: 45,
    marginRight: 12,
  },
  routeLocation: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    color: colors.darkGrey,
    maxWidth: "90%",
  },
  routeLine: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 6,
    height: 20,
    justifyContent: "space-between",
  },
  routeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.grey,
  },
  priceAndDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: colors.darkGrey,
    marginLeft: 6,
  },
  priceTag: {
    backgroundColor: colors.softBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryBlue,
  },
  pricePerPerson: {
    fontSize: 12,
    color: colors.primaryBlue,
    opacity: 0.8,
  },
  driverSection: {
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverNameAndRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 13,
    color: colors.darkGrey,
    marginBottom: 2,
  },
  driverStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    fontSize: 13,
    color: colors.darkGrey,
    marginRight: 6,
  },
  chatButton: {
    padding: 8,
    backgroundColor: colors.softBlue,
    borderRadius: 20,
  },
  tripDetailsSection: {
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 16,
  },
  detailTextContainer: {
    marginLeft: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.darkGrey,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.black,
  },
  preferencesSection: {
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  preferencesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  preferenceText: {
    fontSize: 13,
    color: colors.darkGrey,
    marginLeft: 6,
  },
<<<<<<< HEAD
  statusSection: {
=======
  passengersSection: {
>>>>>>> 7882329 (funcional 1)
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
<<<<<<< HEAD
  statusContainer: {
    flexDirection: "row",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
  },
  additionalInfoSection: {
=======
  passengersList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  passengerItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 14,
  },
  passengerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.black,
  },
  passengerRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  passengerRatingText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.darkGrey,
    marginLeft: 4,
  },
  emptyPassengerSlot: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 14,
  },
  emptyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  emptySlotText: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  notesSection: {
>>>>>>> 7882329 (funcional 1)
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
<<<<<<< HEAD
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.black,
  },
=======
  notesText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.darkGrey,
  },
>>>>>>> 7882329 (funcional 1)
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  footerInfo: {
    flex: 1,
  },
  availableSeatsText: {
    fontSize: 13,
    color: colors.darkGrey,
  },
  priceFooterText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryBlue,
  },
  reserveButton: {
    backgroundColor: colors.primaryPink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

export default RideDetailsScreen;
