import { ActionIcon, Center, Stack, ThemeIcon } from "@mantine/core";
import {
    IconHome,
    IconLogout,
    IconPackage,
    IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import classes from "./navbar.module.css";
import { useUserContext } from "../../contexts/userContext/context.ts";
import { UserPermission } from "../../contexts/userContext/types.ts";

export function Navbar() {
    const navigate = useNavigate();
    const user = useUserContext();

    return (
        <nav className={classes.navbar}>
            <Center>
                <ThemeIcon
                    radius={"md"}
                    size={"xl"}>
                    <IconPackage />
                </ThemeIcon>
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center">
                    <ActionIcon
                        variant={"outline"}
                        size={"xl"}
                        radius={"xl"}
                        onClick={() => navigate("/")}>
                        <IconHome />
                    </ActionIcon>
                    {user.user.permission == UserPermission.Admin && (
                        <ActionIcon
                            variant={"outline"}
                            size={"xl"}
                            radius={"xl"}
                            onClick={() => navigate("/users")}>
                            <IconUser />
                        </ActionIcon>
                    )}
                </Stack>
            </div>

            <Stack
                justify="center"
                gap={0}>
                <ActionIcon
                    variant={"outline"}
                    size={"xl"}
                    radius={"xl"}
                    onClick={() => navigate("/logout")}>
                    <IconLogout />
                </ActionIcon>
            </Stack>
        </nav>
    );
}
