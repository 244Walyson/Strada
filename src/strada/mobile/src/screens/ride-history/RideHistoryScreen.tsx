<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> 7882329 (funcional 1)
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
<<<<<<< HEAD
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors";
import { getRideHistory } from "@/src/services/ride.service";
import { getStoredUserID } from "@/src/services/user.service";
import RideItem from "./RideItem";
import { RideHistoryInterface } from "@/src/interfaces/ride-history.interface";
import { router } from "expo-router";

const itemStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primaryBlue,
  },
  details: {
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: colors.grey,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryPink,
  },
  cancellation: {
    fontSize: 12,
    color: colors.darkPink,
    marginTop: 8,
  },
});

const RideHistoryScreen = () => {
  const [filter, setFilter] = useState<"ALL" | "passenger" | "driver">("ALL");
  const [rides, setRides] = useState<RideHistoryInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // For pagination

  const transformRideData = (
    data: any,
    userType: "driver" | "passenger"
  ): RideHistoryInterface => {
    // Helper to format date and time
    const formatDateTime = (isoString: string) => {
      const date = new Date(isoString);
      const optionsDate: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return {
        date: date.toLocaleDateString("pt-BR", optionsDate).replace(".", ""),
        time: date.toLocaleTimeString("pt-BR", optionsTime),
      };
    };

    const { date, time } = formatDateTime(data.departure_time);

    // Determine status more accurately based on API response
    let status: RideHistoryInterface["status"] = data.status.toLowerCase();
    if (data.request_status === "ACCEPTED") {
      status = "accepted";
    } else if (data.request_status === "PENDING") {
      status = "pending";
    }

    return {
      id: data.id,
      date: date,
      time: time,
      type: userType, // This needs to be consistent with how you filter
      status: status,
      origin: data.start_address,
      destination: data.end_address,
      distance: data.estimated_distance
        ? `${data.estimated_distance.toFixed(1)} km`
        : "N/A",
      duration: data.estimated_duration
        ? `${data.estimated_duration} min`
        : "N/A",
      price: data.price_per_seat
        ? `R$ ${data.price_per_seat.toFixed(2).replace(".", ",")}`
        : "N/A",
      cancellationReason:
        data.status === "CANCELLED" ? "Viagem cancelada." : undefined, // Example
    };
  };

  const fetchRideHistory = async () => {
    setLoading(true);
    setError(null);
    const userId = await getStoredUserID();
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    try {
      let driverRides: any[] = [];
      let passengerRides: any[] = [];
      let transformedData: any[] = []; // Initialize an array to hold the final combined and transformed data

      // 1. Fetch and transform driver rides if applicable
      console.log("Fetching ride history for user ID:", filter);
      if (filter === "driver" || filter === "ALL") {
        const rawDriverHistory = await getRideHistory(userId, {
          userType: "driver",
        });
        driverRides = rawDriverHistory.map((item: any) =>
          transformRideData(item, "driver")
        );
      }

      // 2. Fetch and transform passenger rides if applicable
      if (filter === "passenger" || filter === "ALL") {
        const rawPassengerHistory = await getRideHistory(userId, {
          userType: "passenger",
        });
        passengerRides = rawPassengerHistory.map((item: any) =>
          transformRideData(item, "passenger")
        );
      }

      // 3. Combine the transformed arrays
      // Use a Set to ensure uniqueness if there's any chance of overlap
      // For ride history, often rides will have unique IDs. If they do, you can use a Set.
      // If not, you might need a more complex deduplication logic based on content.
      // Assuming 'id' is a unique identifier for both transformed driver and passenger ride objects.
      const combinedTransformedData = new Set<any>();

      driverRides.forEach((ride) => combinedTransformedData.add(ride));
      passengerRides.forEach((ride) => combinedTransformedData.add(ride));

      // Convert Set back to an array
      transformedData = Array.from(combinedTransformedData);

      // Optional: Sort the combined data by date, relevance, etc.
      // For example, by departure time if applicable
      transformedData.sort((a, b) => {
        // Assuming 'departureTime' or a similar date field exists on transformed items
        const dateA = new Date(a.departureTime || a.preferredDepartureTime);
        const dateB = new Date(b.departureTime || b.preferredDepartureTime);
        return dateB.getTime() - dateA.getTime(); // Sort descending (most recent first)
      });

      setRides(transformedData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      Alert.alert(
        "Erro",
        err.message || "Não foi possível carregar o histórico de caronas."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideHistory();
  }, [filter, page]); // Re-fetch when filter or page changes

  const handleRidePress = (rideId: string) => {
    router.push(`/map/${rideId}`);
  };
=======
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RideItem } from ".";
import { RideHistoryInterface } from "@/src/interfaces/ride-history.interface";

// Cores do seu tema
const colors = {
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

// Dados de exemplo
const rideHistoryData: RideHistoryInterface[] = [
  {
    id: 1,
    date: "24 Abr, 2025",
    time: "08:15",
    type: "passenger",
    status: "completed",
    origin: "Av. Paulista, 1000",
    destination: "Shopping Ibirapuera",
    distance: "7,3 km",
    duration: "25 min",
    price: "R$ 18,50",
    participants: [
      {
        name: "Carlos Oliveira",
        rating: 4.9,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Juliana Costa",
        rating: 4.7,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Roberto Alves",
        rating: 4.5,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Eduardo Lima",
        rating: 4.6,
        photo: "https://via.placeholder.com/60",
        role: "passenger",
      },
    ],
  },
  {
    id: 2,
    date: "22 Abr, 2025",
    time: "17:45",
    type: "driver",
    status: "completed",
    origin: "Estação Faria Lima",
    destination: "Aeroporto de Congonhas",
    distance: "12,5 km",
    duration: "35 min",
    price: "R$ 31,20",
    participants: [
      {
        name: "Marina Santos",
        rating: 4.8,
        photo: "https://via.placeholder.com/60",
        role: "passenger",
      },
    ],
  },
  {
    id: 3,
    date: "20 Abr, 2025",
    time: "14:30",
    type: "passenger",
    status: "completed",
    origin: "Vila Madalena",
    destination: "Parque Ibirapuera",
    distance: "8,9 km",
    duration: "30 min",
    price: "R$ 22,40",
    participants: [
      {
        name: "Juliana Costa",
        rating: 4.7,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Roberto Alves",
        rating: 4.5,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Eduardo Lima",
        rating: 4.6,
        photo: "https://via.placeholder.com/60",
        role: "passenger",
      },
    ],
  },
  {
    id: 4,
    date: "18 Abr, 2025",
    time: "09:10",
    type: "passenger",
    status: "cancelled",
    origin: "Rua Augusta, 500",
    destination: "Shopping Eldorado",
    distance: "6,5 km",
    duration: "20 min",
    price: "R$ 16,00",
    cancellationReason: "Motorista cancelou a viagem",
    participants: [
      {
        name: "Roberto Alves",
        rating: 4.5,
        photo: "https://via.placeholder.com/60",
        role: "driver",
      },
      {
        name: "Eduardo Lima",
        rating: 4.6,
        photo: "https://via.placeholder.com/60",
        role: "passenger",
      },
    ],
  },
  {
    id: 5,
    date: "15 Abr, 2025",
    time: "20:05",
    type: "driver",
    status: "completed",
    origin: "Estação Butantã",
    destination: "Avenida Rebouças, 1500",
    distance: "5,2 km",
    duration: "18 min",
    price: "R$ 14,75",
    participants: [
      {
        name: "Eduardo Lima",
        rating: 4.6,
        photo: "https://via.placeholder.com/60",
        role: "passenger",
      },
    ],
  },
];

const RideHistoryScreen = () => {
  const [filter, setFilter] = useState("Todos");

  const handleRidePress = () => {
    // ação ao tocar em uma carona
  };

  const filteredRides = rideHistoryData.filter((ride) => {
    if (filter === "Todos") return true;
    return ride.type === filter.toLowerCase();
  });
>>>>>>> 7882329 (funcional 1)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
<<<<<<< HEAD
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Caronas</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => Alert.alert("Mais opções", "Opções adicionais aqui.")}
        ></TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        {[
          { label: "Todos", value: "ALL" },
          { label: "Passageiro", value: "passenger" },
          { label: "Motorista", value: "driver" },
        ].map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.filterTab,
              filter === type.value && styles.activeFilterTab,
            ]}
            onPress={() => {
              setFilter(type.value as "ALL" | "passenger" | "driver");
              setPage(1); // Reset page when filter changes
            }}
=======
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Caronas</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        {["Todos", "Passageiro", "Motorista"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterTab,
              filter === type && styles.activeFilterTab,
            ]}
            onPress={() => setFilter(type)}
>>>>>>> 7882329 (funcional 1)
          >
            <Text
              style={[
                styles.filterTabText,
<<<<<<< HEAD
                filter === type.value && styles.activeFilterTabText,
              ]}
            >
              {type.label}
=======
                filter === type && styles.activeFilterTabText,
              ]}
            >
              {type}
>>>>>>> 7882329 (funcional 1)
            </Text>
          </TouchableOpacity>
        ))}
      </View>

<<<<<<< HEAD
      {loading ? (
        <View style={styles.centeredMessage}>
          <ActivityIndicator size="large" color={colors.primaryBlue} />
          <Text style={{ marginTop: 10 }}>Carregando histórico...</Text>
        </View>
      ) : error ? (
        <View style={styles.centeredMessage}>
          <Text style={{ color: colors.darkPink, textAlign: "center" }}>
            {error}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchRideHistory}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RideItem
              ride={item}
              onPress={(item) => handleRidePress(item.id)}
            />
          )}
          contentContainerStyle={styles.rideList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Nenhuma carona encontrada para o filtro selecionado.
            </Text>
          }
        />
      )}
=======
      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RideItem ride={item} onPress={handleRidePress} />
        )}
        contentContainerStyle={styles.rideList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhuma carona encontrada.
          </Text>
        }
      />
>>>>>>> 7882329 (funcional 1)
    </SafeAreaView>
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
  moreButton: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
  },
  filterTabs: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
  },
  activeFilterTab: {
    backgroundColor: colors.primaryBlue,
  },
  filterTabText: {
    color: colors.darkGrey,
    fontWeight: "500",
  },
  activeFilterTabText: {
    color: colors.white,
  },
  rideList: {
    padding: 16,
  },
<<<<<<< HEAD
  centeredMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    color: colors.darkGrey,
  },
  retryButton: {
    marginTop: 15,
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
=======
>>>>>>> 7882329 (funcional 1)
});

export default RideHistoryScreen;
