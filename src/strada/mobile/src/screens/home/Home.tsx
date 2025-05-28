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
  Image,
  StatusBar,
  FlatList,
  useWindowDimensions,
  Modal,
<<<<<<< HEAD
  ActivityIndicator,
  Alert,
  RefreshControl,
=======
>>>>>>> 7882329 (funcional 1)
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppImages } from "@/src/assets";
import { colors } from "@/src/constants/colors";
import AutocompleteSearch from "@/src/components/shared/SearchBar";
<<<<<<< HEAD
import { getPopularRoutes, searchRides } from "@/src/services/ride.service";
import { getStoredUserID, getUser } from "@/src/services/user.service";

interface PopularRoute {
  id: string;
  origin: string;
  destination: string;
  frequency: number;
  lastUsed: string;
  start_address: string;
  end_address: string;
}

interface RideData {
  actual_distance: number | null;
  actual_duration: number | null;
  actual_end_time: string | null; // ISO date string
  actual_route_wkt: string | null;
  actual_start_time: string | null;
  allow_luggage: boolean;
  available_seats: number;
  bounding_box_wkt: string;
  created_at: string; // ISO date string
  current_latitude: number | null;
  current_location_wkt: string | null;
  current_longitude: number | null;
  departure_time: string; // ISO date string
  driver_id: string;
  end_address: string;
  end_distance: number;
  end_point_wkt: string;
  estimated_distance: number;
  estimated_duration: number;
  id: string;
  last_location_update: string | null; // ISO date string or null
  license_plate: string;
  planned_route_wkt: string;
  price_per_seat: number;
  driver: null;
  start_address: string;
  start_distance: number;
  start_point_wkt: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | string;
  total_distance: number;
  updated_at: string; // ISO date string
  vehicle_color: string;
  vehicle_model: string;
  driverName: string;
  driverProfileImg?: string
}
=======

// Amostra de dados para exibição
const POPULAR_ROUTES = [
  {
    id: "1",
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    day: "Seg, Qua, Sex",
  },
  { id: "2", origin: "Campinas", destination: "São Paulo", day: "Ter, Qui" },
  {
    id: "3",
    origin: "Guarulhos",
    destination: "São Paulo",
    day: "Todos os dias",
  },
];

const RIDES_AVAILABLE = [
  {
    id: "1",
    driver: "Mariana S.",
    avatar: AppImages.github,
    origin: "São Paulo",
    destination: "Campinas",
    date: "Hoje, 17:30",
    price: "R$ 35",
    rating: 4.9,
    seats: 3,
  },
  {
    id: "2",
    driver: "Pedro L.",
    avatar: AppImages.github,
    origin: "São Paulo",
    destination: "Santos",
    date: "Amanhã, 09:00",
    price: "R$ 45",
    rating: 4.7,
    seats: 2,
  },
  {
    id: "3",
    driver: "Julia M.",
    avatar: AppImages.github,
    origin: "São Paulo",
    destination: "Guarulhos",
    date: "Hoje, 18:15",
    price: "R$ 25",
    rating: 4.8,
    seats: 1,
  },
];
>>>>>>> 7882329 (funcional 1)

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
<<<<<<< HEAD

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([]);
  const [availableRides, setAvailableRides] = useState<RideData[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [loadingRides, setLoadingRides] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [seeAll, setSeeAll] = useState<"all" | "routes" | "popular-routes">(
    "all"
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getUserLocation = useCallback(async () => {
    setUserLocation({ lat: -23.5505, lng: -46.6333 });
  }, []);

  const loadPopularRoutes = useCallback(async () => {
    try {
      setLoadingRoutes(true);
      if (userLocation) {
        const routes = await getPopularRoutes(
          userLocation.lat,
          userLocation.lng
        );
        routes.map((route: PopularRoute) => {
          route.start_address = route.start_address.split(",")[0];
          route.end_address = route.end_address.split(",")[0];
          route.frequency = route.frequency || 0;
          return route;
        });
        if (seeAll === "all") {
          setPopularRoutes(routes.slice(0, 3));
        } else if (seeAll === "popular-routes") {
          setPopularRoutes(routes);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar rotas populares:", error);
      Alert.alert("Erro", "Não foi possível carregar as rotas populares");
    } finally {
      setLoadingRoutes(false);
    }
  }, [userLocation, seeAll]);

  const loadAvailableRides = useCallback(async () => {
    try {
      setLoadingRides(true);
      if (userLocation) {
        const searchParams = {
          startLat: userLocation.lat,
          startLng: userLocation.lng,
          endLng: userLocation.lng + 3000,
          endLat: userLocation.lat + 3000,
          limit: 10,
          maxEndDistance: 5000,
          sortBy: "time" as const,
        };

        const { rides } = await searchRides(searchParams);
        const ridesList = await Promise.all(
          rides.map(async (ride: RideData) => {
            const { name, imgUrl } = await getUser(ride.driver_id);

            return {
              ...ride,
              driverName: name,
              driverProfileImg: imgUrl
            };
          })
        );

        setAvailableRides(ridesList);
      }
    } catch (error) {
      console.error("Erro ao carregar caronas:", error);
      Alert.alert("Erro", "Não foi possível carregar as caronas disponíveis");
    } finally {
      setLoadingRides(false);
    }
  }, [userLocation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      getUserLocation(),
      loadPopularRoutes(),
      loadAvailableRides(),
    ]);
    setRefreshing(false);
  }, [getUserLocation, loadPopularRoutes, loadAvailableRides]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (userLocation) {
      loadPopularRoutes();
      loadAvailableRides();
    }
  }, [userLocation, loadPopularRoutes, loadAvailableRides]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUserId = await getStoredUserID();
        if (storedUserId) {
          const user = await getUser(storedUserId);
          setUser(user);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
    fetchUser();
  }, []);
=======
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
>>>>>>> 7882329 (funcional 1)

  const openSearchModal = () => {
    setSearchModalVisible(true);
  };

  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

<<<<<<< HEAD
  const handlePlaceSelected = async (place) => {
    setLoadingRides(true)
    if (userLocation && place) {
      try {
        const searchParams = {
          startLat: userLocation.lat,
          startLng: userLocation.lng,
          endLat: place.latitude,
          endLng: place.longitude,
          limit: 10,
          maxStartDistance: 2000,
          maxEndDistance: 2000,
          sortBy: "time" as const,
        };

        setSeeAll("routes")
        closeSearchModal();
        const { rides } = await searchRides(searchParams);
        const ridesList = await Promise.all(
          rides.map(async (ride: RideData) => {
            const { name, imgUrl } = await getUser(ride.driver_id);

            return {
              ...ride,
              driverName: name,
              driverProfileImg: imgUrl
            };
          })
        );

        setAvailableRides(ridesList);
        return
      } catch (error) {
        Alert.alert("Erro", "Erro ao buscar caronas para este destino");
      } finally {
        setLoadingRides(false)
      }
    }

    closeSearchModal();
  };

  const navigateToRideDetails = useCallback((rideId: string) => {
    router.push(`/ride/${rideId}`);
  }, [router])

  const navigateToSearch = useCallback(() => {
    router.push("/map/search");
  }, [router]);

=======
  const handlePlaceSelected = (place) => {
    console.log("Local selecionado:", place);
    // Aqui você pode navegar para a tela de resultados de caronas
    // ou fazer qualquer outra ação necessária
    closeSearchModal();
  };

  const navigateToRideDetails = useCallback(
    (id) => {
      router.push(`/ride/${id}`);
    },
    [router]
  );

  const navigateToSearch = useCallback(() => {
    router.push("/search");
  }, [router]);

  const navigateToRideMap = useCallback(() => {
    router.push("/map/map");
  }, [router]);
>>>>>>> 7882329 (funcional 1)

  const navigateToMyRides = useCallback(() => {
    router.push("/ride-history/ride-history");
  }, [router]);

<<<<<<< HEAD
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const renderPopularRouteItem = ({ item }: { item: PopularRoute }) => (
=======
  const renderPopularRouteItem = ({ item }) => (
>>>>>>> 7882329 (funcional 1)
    <TouchableOpacity
      style={styles.popularRouteCard}
      onPress={() => navigateToSearch()}
    >
      <View style={styles.routeIconContainer}>
        <Icon name="trending-up" size={20} color={colors.primaryPink} />
      </View>
      <View style={styles.routeInfo}>
        <Text style={styles.routeText}>
<<<<<<< HEAD
          {item.start_address} → {item.end_address}
        </Text>
        <Text style={styles.routeSchedule}>
          {item.frequency} viagens esta semana
        </Text>
=======
          {item.origin} → {item.destination}
        </Text>
        <Text style={styles.routeSchedule}>{item.day}</Text>
>>>>>>> 7882329 (funcional 1)
      </View>
      <Icon name="chevron-right" size={24} color={colors.grey} />
    </TouchableOpacity>
  );

<<<<<<< HEAD
  const renderRideItem = ({ item }: { item: RideData }) => (
=======
  const renderRideItem = ({ item }) => (
>>>>>>> 7882329 (funcional 1)
    <TouchableOpacity
      style={styles.rideCard}
      onPress={() => navigateToRideDetails(item.id)}
    >
      <View style={styles.rideHeader}>
        <View style={styles.driverInfo}>
<<<<<<< HEAD
          <Icon
            name="account-circle"
            size={50}
            color={colors.primaryPink}
            style={styles.driverAvatar}
          />

          <View>
            <Text style={styles.driverName}>
              {item.driverName}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            R$ {item.price_per_seat?.toFixed(2)}
          </Text>
=======
          <Image
            source={item.avatar}
            style={styles.driverAvatar}
            defaultSource={AppImages.github}
          />
          <View>
            <Text style={styles.driverName}>{item.driver}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
>>>>>>> 7882329 (funcional 1)
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routePoints}>
          <View style={styles.originPoint}>
            <View style={styles.originDot} />
<<<<<<< HEAD
            <Text style={styles.routePointText} numberOfLines={1}>
              {item.start_address}
            </Text>
=======
            <Text style={styles.routePointText}>{item.origin}</Text>
>>>>>>> 7882329 (funcional 1)
          </View>
          <View style={styles.routeLine} />
          <View style={styles.destinationPoint}>
            <View style={styles.destinationDot} />
<<<<<<< HEAD
            <Text style={styles.routePointText} numberOfLines={1}>
              {item.end_address}
            </Text>
          </View>
        </View>
        <View style={styles.rideDetails}>
          <View style={styles.rideDetailItem}>
            <Icon name="schedule" size={16} color={colors.darkGrey} />
            <Text style={styles.detailText}>
              {formatDate(item.departure_time)}
            </Text>
          </View>
          <View style={styles.rideDetailItem}>
            <Icon name="person" size={16} color={colors.darkGrey} />
            <Text style={styles.detailText}>{item.available_seats} vagas</Text>
          </View>
          {/* Ícones de comodidades */}
          <View style={styles.amenitiesContainer}>
            {item.allow_luggage && (
              <Icon name="luggage" size={14} color={colors.primaryBlue} />
            )}
            {item.allowPets && (
              <Icon name="pets" size={14} color={colors.primaryBlue} />
            )}
            {item.allowSmoking && (
              <Icon name="smoking-rooms" size={14} color={colors.primaryBlue} />
            )}
=======
            <Text style={styles.routePointText}>{item.destination}</Text>
          </View>
        </View>

        <View style={styles.rideDetails}>
          <View style={styles.rideDetailItem}>
            <Icon name="schedule" size={16} color={colors.darkGrey} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.rideDetailItem}>
            <Icon name="person" size={16} color={colors.darkGrey} />
            <Text style={styles.detailText}>{item.seats} vagas</Text>
>>>>>>> 7882329 (funcional 1)
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

<<<<<<< HEAD
  const renderLoadingCard = () => (
    <View style={styles.loadingCard}>
      <ActivityIndicator size="small" color={colors.primaryBlue} />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );

=======
>>>>>>> 7882329 (funcional 1)
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userGreeting}>
<<<<<<< HEAD
          <Text style={styles.greeting}>{user?.name}</Text>
=======
          <Text style={styles.greeting}>Olá, Usuário!</Text>
>>>>>>> 7882329 (funcional 1)
          <Text style={styles.subGreeting}>Para onde vamos hoje?</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/profile/1")}
        >
          <Image source={AppImages.github} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      {/* Search Container */}
=======
>>>>>>> 7882329 (funcional 1)
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar} onPress={openSearchModal}>
          <Icon name="search" size={22} color={colors.darkGrey} />
          <Text style={styles.searchPlaceholder}>Para onde você vai?</Text>
        </TouchableOpacity>
<<<<<<< HEAD
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigateToSearch()}
        >
=======
        <TouchableOpacity style={styles.mapButton} onPress={navigateToRideMap}>
>>>>>>> 7882329 (funcional 1)
          <Icon name="map" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      {/* Search Modal */}
=======
>>>>>>> 7882329 (funcional 1)
      <Modal
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={closeSearchModal}
      >
        <AutocompleteSearch
          onSelectPlace={handlePlaceSelected}
          onBack={closeSearchModal}
        />
      </Modal>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
<<<<<<< HEAD
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
=======
>>>>>>> 7882329 (funcional 1)
      >
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={navigateToSearch}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: colors.softBlue }]}
            >
              <Icon name="search" size={22} color={colors.primaryBlue} />
            </View>
            <Text style={styles.actionText}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/offer-ride/offer-ride")}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: colors.lightPink }]}
            >
              <Icon name="add" size={24} color={colors.primaryPink} />
            </View>
            <Text style={styles.actionText}>Oferecer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={navigateToMyRides}
          >
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: colors.neutralLight },
              ]}
            >
              <Icon name="history" size={22} color={colors.darkGrey} />
            </View>
            <Text style={styles.actionText}>Minhas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/favorites")}
          >
            <View
              style={[styles.actionIcon, { backgroundColor: colors.lightPink }]}
            >
              <Icon name="favorite" size={22} color={colors.primaryPink} />
            </View>
            <Text style={styles.actionText}>Favoritos</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Routes */}
<<<<<<< HEAD
        {(seeAll === "all" || seeAll === "popular-routes") && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Rotas Populares</Text>
              <TouchableOpacity
                onPress={() => {
                  seeAll === "popular-routes"
                    ? setSeeAll("all")
                    : setSeeAll("popular-routes"),
                    loadPopularRoutes();
                }}
              >
                <Text style={styles.seeAllText}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            {loadingRoutes ? (
              renderLoadingCard()
            ) : popularRoutes.length > 0 ? (
              <FlatList
                data={popularRoutes}
                renderItem={renderPopularRouteItem}
                keyExtractor={(item, index) => `route-${item.id}-${index}`}
                scrollEnabled={false}
                removeClippedSubviews={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Icon name="route" size={48} color={colors.grey} />
                <Text style={styles.emptyStateText}>
                  Nenhuma rota popular encontrada na sua região
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Available Rides */}
        {(seeAll === "all" || seeAll === "routes") && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Caronas Disponíveis</Text>
              <TouchableOpacity
                onPress={() => {
                  seeAll === "routes" ? setSeeAll("all") : setSeeAll("routes");
                }}
              >
                <Text style={styles.seeAllText}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            {loadingRides ? (
              renderLoadingCard()
            ) : availableRides.length > 0 ? (
              <FlatList
                data={availableRides}
                renderItem={renderRideItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Icon name="directions-car" size={48} color={colors.grey} />
                <Text style={styles.emptyStateText}>
                  Nenhuma carona disponível no momento
                </Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={onRefresh}
                >
                  <Text style={styles.refreshButtonText}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Loading Card Placeholder */}
=======
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rotas Populares</Text>
            <TouchableOpacity onPress={() => router.push("/routes")}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={POPULAR_ROUTES}
            renderItem={renderPopularRouteItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Available Rides */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Caronas Disponíveis</Text>
            <TouchableOpacity onPress={() => router.push("/rides")}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={RIDES_AVAILABLE}
            renderItem={renderRideItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
>>>>>>> 7882329 (funcional 1)
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
<<<<<<< HEAD
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
=======
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
>>>>>>> 7882329 (funcional 1)
  },
  userGreeting: {
    flex: 1,
  },
  greeting: {
<<<<<<< HEAD
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
=======
    fontSize: 22,
    fontWeight: "700",
    color: colors.black,
    fontFamily: "WorkSans-Bold",
  },
  subGreeting: {
    fontSize: 14,
    color: colors.darkGrey,
    marginTop: 2,
    fontFamily: "WorkSans-Regular",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.lightPink,
>>>>>>> 7882329 (funcional 1)
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
<<<<<<< HEAD
    paddingBottom: 20,
    gap: 12,
=======
    marginTop: 4,
    marginBottom: 16,
>>>>>>> 7882329 (funcional 1)
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutralLight,
<<<<<<< HEAD
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGrey,
  },
  mapButton: {
    backgroundColor: colors.primaryPink,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
=======
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
>>>>>>> 7882329 (funcional 1)
  },
  content: {
    flex: 1,
  },
  scrollContent: {
<<<<<<< HEAD
    paddingHorizontal: 20,
=======
    paddingBottom: 20,
>>>>>>> 7882329 (funcional 1)
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
<<<<<<< HEAD
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
=======
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
>>>>>>> 7882329 (funcional 1)
  },
  actionIcon: {
    width: 56,
    height: 56,
<<<<<<< HEAD
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
=======
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
>>>>>>> 7882329 (funcional 1)
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
<<<<<<< HEAD
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 32,
=======
    color: colors.darkGrey,
    fontFamily: "WorkSans-Medium",
  },
  sectionContainer: {
    marginBottom: 24,
>>>>>>> 7882329 (funcional 1)
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
<<<<<<< HEAD
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
=======
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    fontFamily: "WorkSans-SemiBold",
>>>>>>> 7882329 (funcional 1)
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primaryPink,
<<<<<<< HEAD
    fontWeight: "500",
=======
    fontFamily: "WorkSans-Medium",
>>>>>>> 7882329 (funcional 1)
  },
  popularRouteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
<<<<<<< HEAD
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightPink,
    justifyContent: "center",
    alignItems: "center",
=======
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  routeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryPink,
    alignItems: "center",
    justifyContent: "center",
>>>>>>> 7882329 (funcional 1)
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
<<<<<<< HEAD
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
  },
  routeSchedule: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  rideCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
=======
    fontSize: 15,
    color: colors.black,
    fontFamily: "WorkSans-Medium",
  },
  routeSchedule: {
    fontSize: 13,
    color: colors.darkGrey,
    marginTop: 2,
    fontFamily: "WorkSans-Regular",
  },
  rideCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 16,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
>>>>>>> 7882329 (funcional 1)
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    flex: 1,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 4,
=======
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    fontFamily: "WorkSans-Medium",
>>>>>>> 7882329 (funcional 1)
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "500",
  },
  priceContainer: {
    backgroundColor: colors.lightPink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryPink,
  },
  routeContainer: {
    gap: 12,
  },
  routePoints: {
    gap: 8,
=======
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    color: colors.darkGrey,
    marginLeft: 4,
    fontFamily: "WorkSans-Medium",
  },
  priceContainer: {
    backgroundColor: colors.softBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 14,
    color: colors.primaryBlue,
    fontWeight: "600",
    fontFamily: "WorkSans-SemiBold",
  },
  routeContainer: {
    marginTop: 4,
  },
  routePoints: {
    marginBottom: 12,
>>>>>>> 7882329 (funcional 1)
  },
  originPoint: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    gap: 12,
=======
    marginBottom: 4,
  },
  originDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryPink,
    marginRight: 8,
  },
  routeLine: {
    width: 1,
    height: 14,
    backgroundColor: colors.grey,
    marginLeft: 5,
    marginVertical: 2,
>>>>>>> 7882329 (funcional 1)
  },
  destinationPoint: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    gap: 12,
  },
  originDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryBlue,
  },
  destinationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryPink,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.grey,
    marginLeft: 3,
=======
    marginTop: 4,
  },
  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryBlue,
    marginRight: 8,
>>>>>>> 7882329 (funcional 1)
  },
  routePointText: {
    fontSize: 14,
    color: colors.black,
<<<<<<< HEAD
    flex: 1,
  },
  rideDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
=======
    fontFamily: "WorkSans-Regular",
  },
  rideDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
>>>>>>> 7882329 (funcional 1)
  },
  rideDetailItem: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
    gap: 4,
=======
>>>>>>> 7882329 (funcional 1)
  },
  detailText: {
    fontSize: 13,
    color: colors.darkGrey,
<<<<<<< HEAD
  },
  amenitiesContainer: {
    flexDirection: "row",
    gap: 8,
    marginLeft: "auto",
  },
  loadingCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    fontSize: 14,
    color: colors.darkGrey,
    marginTop: 8,
  },
  emptyState: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.darkGrey,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
=======
    marginLeft: 6,
    fontFamily: "WorkSans-Medium",
>>>>>>> 7882329 (funcional 1)
  },
});

export default HomeScreen;
